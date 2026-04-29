# MAT Behaviour Category — project context

> **Purpose for AI:** Use this file for product intent, taxonomy, and reporting goals when working on behaviour mapping, categories, or MIS-related flows in this repo.

## Product summary

| Item | Detail |
|------|--------|
| **Initiative** | Introduce a **Behaviour Category** field in Arbor MIS. |
| **What it does** | Groups **school-defined behaviour types** (e.g. “Chewing gum”, “Forgetting homework”, “Not listening to instructions”) into **consistent, reportable categories** (e.g. “Defiance / Non-Compliance”). |
| **School UX** | Schools keep logging and analysing by **type** as today; categories layer **standardisation for aggregation**, not a replacement for local type names. |
| **Reporting levels** | Enables consistent analysis at **MAT**, **LA**, and **national** scale. |

## Default Arbor taxonomy

- Arbor maintains **one canonical list** used across all schools/MATs for comparable analysis.
- **Custom or government frameworks** map **onto** these defaults (they do not replace the canonical set for cross-site analysis).
- Categories are **versioned** (e.g. v1.0, v1.1) so **historical data** stay correct when the list changes.

**Counts:** 8 positive + 15 negative = **23 default categories** (v1 reference list below).

### Positive categories (8)

| Category | Description |
|----------|-------------|
| Respect | Showing consideration and courtesy to others. |
| Responsibility | Demonstrating accountability for actions and work. |
| Resilience | Persisting through challenges or setbacks. |
| Kindness | Supporting and helping others through positive actions. |
| Cooperation | Working effectively with peers and staff. |
| Leadership | Taking initiative and setting a positive example. |
| Positive Attitude | Displaying optimism and enthusiasm in learning or school life. |
| Community Contribution | Making a positive impact within or beyond the school community. |

### Negative categories (15)

| Category | Description |
|----------|-------------|
| Disruption | Interrupting learning or distracting others. |
| Defiance / Non-Compliance | Refusing to follow rules or instructions. |
| Disrespect | Rude or inappropriate conduct towards staff or peers. |
| Inappropriate Language | Use of offensive, discriminatory, or explicit language. |
| Bullying | Repeated, targeted behaviour intending to harm or intimidate. |
| Discriminatory Behaviour | Racism, sexism, homophobia, or prejudice-based conduct. |
| Dishonesty | Lying, cheating, or deliberate deception. |
| Vandalism / Damage to Property | Damaging school or personal belongings. |
| Physical Aggression | Hitting, pushing, or other harmful physical acts. |
| Non-Physical Aggression | Threatening, intimidating, or verbally hostile behaviour. |
| Inappropriate Use of Technology | Misuse of devices or online platforms. |
| Truancy / Lateness | Missing lessons or arriving late without reason. |
| Poor Preparedness | Lack of equipment, homework, or readiness to learn. |
| Substance Use / Possession | Possessing or using tobacco, vaping, alcohol, or drugs. |
| Sexual Misconduct / Harassment | Inappropriate or harmful sexual behaviour. |

## Problem (why this exists)

**Current state:** Behaviour **types** are unstructured and inconsistently named across schools (e.g. “Defiance”, “Refusal”, “Non-compliance” treated as separate or overlapping concepts).

**Consequences:**

- MATs spend significant time **manually aligning** or exporting data.
- Schools **cannot easily compare** to peers on a common basis.
- MATs and LAs **cannot reliably benchmark or aggregate** behaviour data.
- **Group-level reporting** is unreliable.
- **National** views are fragmented and hard to interpret fairly.
- **Manual standardisation** increases school workload and **drifts out of sync**.

## Solution (what we’re building)

- Add a **Behaviour Category** field that **groups behaviour types** into the **standard categories** above for reporting and analytics.
- Preserve school workflows on **types** while unlocking **consistent category** roll-ups for trusts, LAs, and national use.

## Terminology (quick reference)

| Term | Meaning |
|------|---------|
| **Behaviour type** | School-specific label for an incident pattern (local vocabulary). |
| **Behaviour category** | Canonical bucket from Arbor’s default list (and versions) for cross-school reporting. |
| **Mapping** | Association from types (and optionally frameworks) to default categories. |

---

*When the canonical list or version changes, treat **version** as part of the reporting contract for historical accuracy.*
