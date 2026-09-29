\# ADR-001: Elecció de base de dades



\## Context



Necessitem una base de dades flexible per emmagatzemar productes, usuaris i comandes. Les relacions entre aquestes entitats poden evolucionar durant el desenvolupament del projecte.



\## Decisió



Farem servir MongoDB com a base de dades principal del projecte, gestionada mitjançant Docker.



\## Conseqüències



\### Positives



\* Flexibilitat per afegir nous camps i entitats.

\* Bona integració amb Node.js i Express.

\* Fàcil de gestionar en un entorn Dockeritzat.



\### Negatives



\* Menys adequada per a consultes amb moltes relacions complexes.

\* Cal tenir especial cura amb el disseny dels documents i les relacions entre dades.



