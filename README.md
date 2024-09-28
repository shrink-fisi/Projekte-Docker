# Docker Compose Node.js & PostgreSQL Projekt

## Projektbeschreibung

Dieses Projekt besteht aus einer einfachen Node.js-Webanwendung, die mit einem PostgreSQL-Datenbankcontainer über Docker Compose verknüpft ist. Die Webanwendung bietet folgende Funktionalitäten:
1. Eine Willkommensseite, die die aktuelle Zeit anzeigt und einen Link anbietet zur zweiten Seite
2. Eine zweite Seite mit detaillierten Informationen über die Datenbanken, die auf dem PostgreSQL-Container laufen. Hier werden die Größe jeder Datenbank sowie die Anzahl der Abfragen 
in den letzten 30 Sekunden, 5 Minuten und 1 Stunde dargestellt.

Die Anwendung nutzt **Express.js** als Webserver und **pg**, um die Verbindung zu PostgreSQL zu verwalten. 
Mithilfe von Docker Compose werden sowohl der Node.js-Server als auch der PostgreSQL-Server gemeinsam hochgefahren.

## Komponenten

- **Node.js**: Ein Server, der auf Express.js basiert und die HTTP-Endpunkte bereitstellt.
- **PostgreSQL**: Eine relationale Datenbank, die in einem separaten Container läuft und die für Abfragen und Speichern von Daten verwendet wird.
- **Docker Compose**: Verwaltet und verknüpft die verschiedenen Container des Projekts, sodass sowohl Node.js als auch PostgreSQL zusammenarbeiten können.

## Endpunkte

- **`/`**: Zeigt eine Seite mit der aktuellen Uhrzeit(UTC) und einem Link zu den Datenbankinformationen.
- **`/db-info`**: Gibt die Datenbankinformationen als JSON zurück, einschließlich der Datenbanknamen, ihrer Größe und der Abfragen, die in den letzten 30 Sekunden, 5 Minuten und 1 Stunde ausgeführt wurden.

## Voraussetzungen

- Docker und Docker Compose müssen installiert sein.

## Installation und Ausführung

1. Klone dieses Repository.
2. Führe folgenden Befehl aus:

   docker-compose up

3. Öffne deinen Browser und gehe auf http://localhost:3000, um die Main Page zu sehen.
4. Öffne http://localhost:3000/db-info, oder klicke auf den Link der Main Page um die Datenbankinformationen zu sehen.

## Schwierigkeiten

Während der Umsetzung dieses Projekts bin ich auf einige Herausforderungen gestoßen:

Datenbankverbindung: Es gab anfänglich Probleme, eine stabile Verbindung zur PostgreSQL-Datenbank herzustellen. 
Der Pool-Mechanismus war ungewohnt. Generell war das Arbeiten mit node.js viel Trial&Error.

Docker Networking: Das Verbinden der beiden Container (Node.js und PostgreSQL) über Docker Compose erforderte am Anfang etwas Recherche.

SQL-Abfragen für Statistiken: Die Abfrage der Anzahl von Anfragen in den letzten 30 Sekunden, 5 Minuten und 1 Stunde erforderte das ich mich noch einmal in SQL bzw. PostgreSQL-Interna (insbesondere pg_stat_activity), einarbeiten musste.

Frontend/Backend-Kommunikation: JSON war wie immer nervig, wenn man nicht regelmäßig mit arbeitet

Hinweis zur Codebasis

Der JavaScript-Code, insbesondere für die Datenbankabfragen und die Verarbeitung der Ergebnisse, wurde größtenteils aus verschiedenen Quellen im Internet zusammengetragen. Ich habe ihn dann entsprechend der Anforderungen dieses Projekts angepasst und erweitert. Viele Fragmente stammen aus Foren, Tutorials und der offiziellen Dokumentation von Express.js und PostgreSQL.
