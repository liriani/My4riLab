import type { ReactElement } from "react";
import {
  AssemblyLine,
  BlackHole,
  CrumbTrail,
  CustomsCheck,
  ElasticDeadline,
  GravityOverride,
  LayoutEarthquake,
  MagneticKerning,
  MaintenanceCrew,
  OverworkedTab,
  PhysicsSpill,
  ScrollFan,
  ShyVoyeur,
  TypographicWildlife,
  UndoPoltergeist,
  Wormhole,
} from "@/features/lab/LabStages";
import { labCaseMeta, type LabCaseMeta } from "./labCaseMeta";

export type LabCase = LabCaseMeta & {
  stage: (key: number) => ReactElement;
};

/** One interactive stage per exhibit, in the same order as labCaseMeta. */
const stages: LabCase["stage"][] = [
  (k) => <AssemblyLine key={k} />,
  (k) => <ShyVoyeur key={k} />,
  (k) => <PhysicsSpill key={k} resetKey={k} />,
  (k) => <CustomsCheck key={k} />,
  (k) => <ElasticDeadline key={k} />,
  (k) => <TypographicWildlife key={k} />,
  (k) => <LayoutEarthquake key={k} resetKey={k} />,
  (k) => <ScrollFan key={k} />,
  (k) => <BlackHole key={k} />,
  (k) => <MaintenanceCrew key={k} resetKey={k} />,
  (k) => <UndoPoltergeist key={k} resetKey={k} />,
  (k) => <OverworkedTab key={k} resetKey={k} />,
  (k) => <MagneticKerning key={k} />,
  (k) => <Wormhole key={k} resetKey={k} />,
  (k) => <CrumbTrail key={k} resetKey={k} />,
  (k) => <GravityOverride key={k} resetKey={k} />,
];

export const labCases: LabCase[] = labCaseMeta.map((meta, index) => ({ ...meta, stage: stages[index] }));

export const padCase = (n: number) => String(n).padStart(2, "0");

/** Case ids are the two-digit accession numbers used in the URL: /lab/01 … /lab/16. */
export const labCaseId = (index: number) => padCase(index + 1);

export const labCasePath = (index: number) => `/lab/${labCaseId(index)}`;

export function getLabCaseIndex(id: string | undefined) {
  if (!id || !/^\d{2}$/.test(id)) return -1;
  const index = Number(id) - 1;
  return index >= 0 && index < labCases.length ? index : -1;
}
