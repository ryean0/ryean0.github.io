// FILE: src/app/components/ProjectsPage/ProjectKnowledgeGraph.tsx — NEW FILE
"use client";

import {
  useMemo,
  useRef,
  useState,
  useEffect,
  useCallback,
} from "react";
import dynamic from "next/dynamic";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import { alpha } from "@mui/material/styles";
import { Box as BoxIcon, Square, RotateCcw } from "lucide-react";
import type { ProjectData } from "@/data/siteConfig";
import {
  projectDomains,
  domainEdges,
  type ProjectDomain,
} from "@/data/profile/projectDomains";

// ─── Dynamic (SSR-disabled) graph imports ────────────────────────────
const ForceGraph2D = dynamic(() => import("react-force-graph-2d"), {
  ssr: false,
  loading: () => <GraphSkeleton />,
});
const ForceGraph3D = dynamic(() => import("react-force-graph-3d"), {
  ssr: false,
  loading: () => <GraphSkeleton />,
});

// ─── Node / Link Types ───────────────────────────────────────────────
type NodeKind = "root" | "domain" | "project";

export interface GraphNode {
  id: string;
  label: string;
  kind: NodeKind;
  color: string;
  size: number;
  /** Attached for "project" nodes only — used to open the modal */
  project?: ProjectData;
  /** Attached for "domain" nodes only */
  domain?: ProjectDomain;
  // Runtime-mutated by force-graph
  x?: number;
  y?: number;
  z?: number;
}

interface GraphLink {
  source: string;
  target: string;
  color: string;
  kind: "root-domain" | "domain-domain" | "domain-project";
}

interface GraphData {
  nodes: GraphNode[];
  links: GraphLink[];
}

// ─── Props ───────────────────────────────────────────────────────────
interface ProjectKnowledgeGraphProps {
  projects: ProjectData[];
  onProjectSelect: (project: ProjectData) => void;
}

// ─── Constants ───────────────────────────────────────────────────────
const ROOT_ID = "__root__";
const ROOT_COLOR = "#e2e8f0";
const CANVAS_BG = "rgba(12,18,34,0)"; // transparent → inherits container bg

// ─── Skeleton loading state ──────────────────────────────────────────
function GraphSkeleton() {
  return (
    <Box
      sx={{
        width: "100%",
        height: 520,
        borderRadius: 3,
        border: "1px dashed rgba(255,255,255,0.08)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Typography variant="body2" color="text.disabled">
        Loading graph…
      </Typography>
    </Box>
  );
}

// ─── Component ───────────────────────────────────────────────────────
export default function ProjectKnowledgeGraph({
  projects,
  onProjectSelect,
}: ProjectKnowledgeGraphProps) {
  const [viewMode, setViewMode] = useState<"2d" | "3d">("2d");
  const [hoverId, setHoverId] = useState<string | null>(null);
  const [dims, setDims] = useState({ width: 800, height: 520 });
  const containerRef = useRef<HTMLDivElement | null>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const fg2dRef = useRef<any>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const fg3dRef = useRef<any>(null);

  // ─ Responsive width tracking ─
  useEffect(() => {
    if (!containerRef.current) return;
    const ro = new ResizeObserver((entries) => {
      for (const e of entries) {
        setDims((d) => ({ ...d, width: Math.floor(e.contentRect.width) }));
      }
    });
    ro.observe(containerRef.current);
    return () => ro.disconnect();
  }, []);

  // ─ Build graph data ─
  const graphData: GraphData = useMemo(() => {
    const nodes: GraphNode[] = [];
    const links: GraphLink[] = [];

    // Root node
    nodes.push({
      id: ROOT_ID,
      label: "Projects",
      kind: "root",
      color: ROOT_COLOR,
      size: 12,
    });

    // Domain nodes (level 1) + root→domain edges
    projectDomains.forEach((d) => {
      nodes.push({
        id: d.id,
        label: d.label,
        kind: "domain",
        color: d.color,
        size: 8,
        domain: d,
      });
      links.push({
        source: ROOT_ID,
        target: d.id,
        color: alpha(d.color, 0.4),
        kind: "root-domain",
      });
    });

    // Inter-domain edges (level 1 ↔ level 1)
    domainEdges.forEach(([a, b]) => {
      const color = alpha("#94a3b8", 0.3);
      links.push({
        source: a,
        target: b,
        color,
        kind: "domain-domain",
      });
    });

    // Project nodes (level 2) + domain→project edges
    projects.forEach((p) => {
      // Each project coloured by its PRIMARY (first) domain
      const primaryDomain =
        projectDomains.find((d) => d.id === p.domains[0]) ?? projectDomains[0];
      nodes.push({
        id: p.id,
        label: p.title,
        kind: "project",
        color: primaryDomain.color,
        size: 6,
        project: p,
      });
      p.domains.forEach((domainId) => {
        const dom = projectDomains.find((d) => d.id === domainId);
        if (!dom) return;
        links.push({
          source: domainId,
          target: p.id,
          color: alpha(dom.color, 0.55),
          kind: "domain-project",
        });
      });
    });

    return { nodes, links };
  }, [projects]);

  // ─ Node click handler (only project nodes trigger modal) ─
  const handleNodeClick = useCallback(
    (node: GraphNode) => {
      if (node.kind === "project" && node.project) {
        onProjectSelect(node.project);
      }
    },
    [onProjectSelect]
  );

  // ─ Reset camera / view ─
  const handleReset = useCallback(() => {
    if (viewMode === "2d" && fg2dRef.current) {
      fg2dRef.current.zoomToFit(400, 60);
    } else if (viewMode === "3d" && fg3dRef.current) {
      fg3dRef.current.cameraPosition({ x: 0, y: 0, z: 280 }, { x: 0, y: 0, z: 0 }, 800);
    }
  }, [viewMode]);

  // ─ 2D canvas custom node renderer ─
  const paintNode2D = useCallback(
    (node: GraphNode, ctx: CanvasRenderingContext2D, globalScale: number) => {
      const { x = 0, y = 0, size, color, label, kind, id } = node;
      const isHover = hoverId === id;

      // Node circle
      ctx.beginPath();
      ctx.arc(x, y, size, 0, 2 * Math.PI, false);
      ctx.fillStyle = kind === "root" ? "#0f172a" : alpha(color, 0.25);
      ctx.fill();

      ctx.lineWidth = isHover ? 2.5 : kind === "root" ? 2 : 1.5;
      ctx.strokeStyle = isHover ? "#ffffff" : color;
      ctx.stroke();

      // Glow halo on hover / for root
      if (isHover || kind === "root") {
        ctx.beginPath();
        ctx.arc(x, y, size + 3, 0, 2 * Math.PI, false);
        ctx.strokeStyle = alpha(color, 0.35);
        ctx.lineWidth = 1.2;
        ctx.stroke();
      }

      // Label
      const fontSize =
        kind === "root" ? 5.5 : kind === "domain" ? 4 : 3.5;
      ctx.font = `${kind === "project" ? "400" : "600"} ${fontSize}px Inter, system-ui, sans-serif`;
      ctx.textAlign = "center";
      ctx.textBaseline = "top";
      ctx.fillStyle =
        kind === "root"
          ? "#e2e8f0"
          : kind === "domain"
          ? color
          : alpha("#cbd5e1", isHover ? 1 : 0.85);
      ctx.fillText(label, x, y + size + 1.5);

      // Project nodes: subtle "clickable" dot indicator
      if (kind === "project") {
        ctx.beginPath();
        ctx.arc(x + size * 0.6, y - size * 0.6, 1.4, 0, 2 * Math.PI);
        ctx.fillStyle = "#ffffff";
        ctx.fill();
      }

      // Unused param silencer
      void globalScale;
    },
    [hoverId]
  );

  // ─ Common graph props ─
  const commonProps = {
    graphData,
    nodeLabel: (n: GraphNode) =>
      n.kind === "project"
        ? `${n.label} — click to open`
        : n.kind === "domain"
        ? `Domain: ${n.label}`
        : "Root",
    nodeVal: (n: GraphNode) => n.size,
    nodeColor: (n: GraphNode) => n.color,
    linkColor: (l: GraphLink) => l.color,
    linkWidth: (l: GraphLink) => (l.kind === "domain-domain" ? 0.6 : 1),
    linkOpacity: 0.5,
    onNodeClick: (n: GraphNode) => handleNodeClick(n),
    onNodeHover: (n: GraphNode | null) => {
      setHoverId(n?.id ?? null);
      if (containerRef.current) {
        containerRef.current.style.cursor =
          n?.kind === "project" ? "pointer" : "default";
      }
    },
    cooldownTicks: 120,
    width: dims.width,
    height: dims.height,
    backgroundColor: CANVAS_BG,
  };

  return (
    <Box sx={{ width: "100%" }}>
      {/* Controls */}
      <Stack
        direction="row"
        spacing={1}
        alignItems="center"
        justifyContent="flex-end"
        mb={1.5}
      >
        <ToggleButtonGroup
          value={viewMode}
          exclusive
          size="small"
          onChange={(_, v) => v && setViewMode(v)}
          aria-label="Graph view mode"
          sx={{
            "& .MuiToggleButton-root": {
              textTransform: "none",
              fontSize: "0.72rem",
              px: 1.5,
              py: 0.5,
              color: "text.secondary",
              borderColor: "rgba(255,255,255,0.1)",
              "&.Mui-selected": {
                bgcolor: alpha("#38bdf8", 0.15),
                color: "#38bdf8",
                borderColor: alpha("#38bdf8", 0.4),
              },
            },
          }}
        >
          <ToggleButton value="2d" aria-label="2D view">
            <Square size={13} style={{ marginRight: 6 }} />
            2D
          </ToggleButton>
          <ToggleButton value="3d" aria-label="3D view">
            <BoxIcon size={13} style={{ marginRight: 6 }} />
            3D
          </ToggleButton>
        </ToggleButtonGroup>
        <Tooltip title={viewMode === "3d" ? "Reset camera" : "Fit graph"}>
          <ToggleButton
            value=""
            size="small"
            selected={false}
            onClick={handleReset}
            aria-label="Reset view"
            sx={{
              textTransform: "none",
              color: "text.secondary",
              borderColor: "rgba(255,255,255,0.1)",
            }}
          >
            <RotateCcw size={13} />
          </ToggleButton>
        </Tooltip>
      </Stack>

      {/* Canvas container */}
      <Box
        ref={containerRef}
        sx={{
          position: "relative",
          width: "100%",
          height: dims.height,
          borderRadius: 3,
          overflow: "hidden",
          border: "1px solid rgba(255,255,255,0.06)",
          bgcolor: "rgba(15,23,42,0.4)",
          backdropFilter: "blur(8px)",
        }}
      >
        {viewMode === "2d" ? (
          <ForceGraph2D
            ref={fg2dRef}
            {...commonProps}
            nodeCanvasObject={paintNode2D}
            nodeCanvasObjectMode={() => "replace"}
            enableZoomInteraction
            enablePanInteraction
            linkDirectionalParticles={0}
          />
        ) : (
          <ForceGraph3D
            ref={fg3dRef}
            {...commonProps}
            nodeResolution={16}
            nodeOpacity={0.85}
            linkOpacity={0.4}
            enableNodeDrag
            enableNavigationControls
            showNavInfo={false}
            backgroundColor="rgba(15,23,42,1)"
          />
        )}

        {/* Instruction hint overlay */}
        <Box
          sx={{
            position: "absolute",
            bottom: 10,
            left: 12,
            display: "flex",
            alignItems: "center",
            gap: 1,
            px: 1.25,
            py: 0.5,
            borderRadius: 2,
            bgcolor: "rgba(0,0,0,0.4)",
            border: "1px solid rgba(255,255,255,0.08)",
            pointerEvents: "none",
          }}
        >
          <Typography
            variant="caption"
            sx={{
              fontSize: "0.68rem",
              color: "text.disabled",
              fontFamily: "var(--font-geist-mono, monospace)",
            }}
          >
            {viewMode === "2d"
              ? "scroll to zoom · drag to pan · click project to open"
              : "drag to rotate · scroll to zoom · click project to open"}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}
