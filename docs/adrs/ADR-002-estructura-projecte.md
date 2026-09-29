\# ADR-002: Estructura inicial del projecte



\## Context



El projecte està format per diferents parts, principalment el backend i el frontend. Necessitem decidir com organitzar aquests components per facilitar el desenvolupament, el manteniment i el control de versions.



\## Decisió



Farem servir una estructura de repositoris separats: el backend i el frontend tindran els seus propis repositoris Git.



En aquest repositori es mantindrà el backend, juntament amb la documentació relacionada, els diagrames i els Architecture Decision Records (ADR).



\## Conseqüències



\### Positives



\* Cada part del projecte té el seu propi cicle de desenvolupament.

\* El backend i el frontend poden evolucionar de manera independent.

\* Els canvis són més fàcils de controlar dins de cada repositori.



\### Negatives



\* Cal gestionar dos repositoris.

\* Els canvis que afectin simultàniament frontend i backend poden requerir coordinació entre repositoris.



