# ADR-002: Estructura inicial del projecte

## Context

El projecte necessita una estructura que permeti desenvolupar
el backend de manera ordenada i facilitar la col·laboració
entre els membres de l'equip.

També necessitem centralitzar la documentació relacionada
amb l'arquitectura i el modelatge del domini.

## Decisió

Farem servir un repositori backend amb una estructura
organitzada per carpetes.

La documentació d'arquitectura es guardarà dins de la carpeta
`docs/`, separant els diagrames dels Architecture Decision
Records.

L'estructura inicial serà:

- `docs/diagrams/` per als diagrames.
- `docs/adrs/` per als ADRs.
- `src/` per al codi font del backend.

## Conseqüències

### Positives

- Estructura clara i fàcil de mantenir.
- La documentació queda versionada juntament amb el projecte.
- Facilita la col·laboració entre els membres de l'equip.
- Les decisions arquitectòniques queden registrades.

### Negatives

- Cal mantenir actualitzada la documentació.
- Els canvis importants en l'arquitectura poden requerir
  nous ADRs.
