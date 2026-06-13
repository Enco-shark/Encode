import { dict as en } from "./en"

type Keys = keyof typeof en

export const dict = {
  // Language names
  "language.en": "English",
  "language.zh": "简体中�?,
  "language.zht": "繁體中文",
  "language.ko": "한국�?,
  "language.de": "Deutsch",
  "language.es": "Español",
  "language.fr": "Français",
  "language.da": "Dansk",
  "language.ja": "日本�?,
  "language.pl": "Polski",
  "language.ru": "Русский",
  "language.ar": "العربية",
  "language.no": "Norsk",
  "language.br": "Português (Brasil)",
  "language.bs": "Bosanski",
  "language.th": "ไท�?,
  "language.tr": "Türkçe",

  // Prompt placeholders
  "tui.prompt.placeholder.normal": 'Posez votre question... "{{example}}"',
  "tui.prompt.placeholder.shell": 'Exécuter une commande... "{{example}}"',
  "tui.prompt.ghost": "{{prediction}}  (Tab pour accepter)",
  "tui.home.placeholder.example.todo": "Corriger un TODO dans le code",
  "tui.home.placeholder.example.stack": "Quelle est la stack technique de ce projet ?",
  "tui.home.placeholder.example.tests": "Réparer les tests cassés",

  // Prompt bottom hints (trigger characters)
  "tui.prompt.hint.attach_file": "joindre un fichier",
  "tui.prompt.hint.subagent": "sous-agent",
  "tui.prompt.hint.commands": "commandes",
  "tui.prompt.hint.switch_mode": "changer de mode",
  "tui.prompt.hint.settings": "paramètres",

  // Tips
  "tui.tips.label": "Astuce",
  "tui.tips.plain_terminal": "Nous recommandons iTerm ou le terminal VS Code",
  "tui.tips.attach_file":
    "Tapez {highlight}@{/highlight} suivi d'un nom de fichier pour rechercher et joindre des fichiers",
  "tui.tips.shell_prefix":
    "Commencez un message par {highlight}!{/highlight} pour exécuter directement des commandes shell (ex. {highlight}!ls -la{/highlight})",
  "tui.tips.tab_agent":
    "Appuyez sur {highlight}Tab{/highlight} ou {highlight}Shift+Tab{/highlight} pour basculer entre les agents Build, Plan et Compose",
  "tui.tips.theme_mode":
    "Exécutez {highlight}/dark{/highlight} pour le mode sombre ou {highlight}/light{/highlight} pour le mode clair",
  "tui.tips.doc": "Exécutez {highlight}/doc{/highlight} pour ouvrir la documentation utilisateur",
  "tui.tips.free_models": "Modèles gratuits disponibles pour une durée limitée �?essayez-les !",
  "tui.tips.background":
    "Exécutez {highlight}/background{/highlight} pour définir une image personnalisée comme fond d'écran d'accueil",
  "tui.tips.undo": "Utilisez {highlight}/undo{/highlight} pour annuler le dernier message et ses modifications",
  "tui.tips.redo": "Utilisez {highlight}/redo{/highlight} pour rétablir des messages et modifications précédemment annulés",
  "tui.tips.share":
    "Exécutez {highlight}/share{/highlight} pour créer un lien public vers votre conversation sur opencode.ai",
  "tui.tips.drag_drop": "Glissez-déposez des images ou PDF dans le terminal pour les ajouter au contexte",
  "tui.tips.paste_image":
    "Appuyez sur {highlight}Ctrl+V{/highlight} pour coller des images du presse-papiers dans l'invite",
  "tui.tips.editor":
    "Appuyez sur {highlight}Ctrl+X E{/highlight} ou {highlight}/editor{/highlight} pour rédiger des messages dans votre éditeur externe",
  "tui.tips.init":
    "Exécutez {highlight}/init{/highlight} pour générer automatiquement les règles du projet à partir de votre code",
  "tui.tips.models":
    "Exécutez {highlight}/models{/highlight} ou {highlight}Ctrl+X M{/highlight} pour changer de modèle",
  "tui.tips.theme":
    "Utilisez {highlight}/themes{/highlight} ou {highlight}Ctrl+X T{/highlight} pour basculer entre {{count}} thèmes intégrés",
  "tui.tips.new_session":
    "Appuyez sur {highlight}Ctrl+X N{/highlight} ou {highlight}/new{/highlight} pour démarrer une nouvelle session",
  "tui.tips.sessions":
    "Utilisez {highlight}/sessions{/highlight} ou {highlight}Ctrl+X L{/highlight} pour lister et reprendre des conversations",
  "tui.tips.compact":
    "Exécutez {highlight}/compact{/highlight} pour résumer les longues sessions à l'approche de la limite de contexte",
  "tui.tips.export":
    "Appuyez sur {highlight}Ctrl+X X{/highlight} ou {highlight}/export{/highlight} pour enregistrer la conversation en Markdown",
  "tui.tips.copy_last":
    "Appuyez sur {highlight}Ctrl+X Y{/highlight} pour copier le dernier message de l'assistant",
  "tui.tips.command_palette":
    "Appuyez sur {highlight}Ctrl+P{/highlight} pour voir toutes les actions et commandes disponibles",
  "tui.tips.login":
    "Exécutez {highlight}/login{/highlight} pour vous connecter et utiliser votre forfait de tokens",
  "tui.tips.connect":
    "Exécutez {highlight}/connect{/highlight} pour choisir votre fournisseur LLM et ajouter des clés API",
  "tui.tips.leader":
    "La touche leader est {highlight}Ctrl+X{/highlight} ; combinez-la avec d'autres pour des actions rapides",
  "tui.tips.f2": "Appuyez sur {highlight}F2{/highlight} pour basculer rapidement entre les modèles récents",
  "tui.tips.sidebar": "Appuyez sur {highlight}Ctrl+X B{/highlight} pour afficher/masquer la barre latérale",
  "tui.tips.history":
    "Utilisez {highlight}PageUp{/highlight}/{highlight}PageDown{/highlight} pour parcourir l'historique de la conversation",
  "tui.tips.jump_first":
    "Appuyez sur {highlight}Ctrl+G{/highlight} ou {highlight}Home{/highlight} pour aller au début de la conversation",
  "tui.tips.jump_last":
    "Appuyez sur {highlight}Ctrl+Alt+G{/highlight} ou {highlight}End{/highlight} pour aller au message le plus récent",
  "tui.tips.newline":
    "Appuyez sur {highlight}Shift+Enter{/highlight} ou {highlight}Ctrl+J{/highlight} pour insérer un saut de ligne dans l'invite",
  "tui.tips.clear_input": "Appuyez sur {highlight}Ctrl+C{/highlight} pendant la saisie pour vider le champ",
  "tui.tips.escape": "Appuyez sur {highlight}Escape{/highlight} pour interrompre l'IA en cours de réponse",
  "tui.tips.plan_agent":
    "Passez à l'agent {highlight}Plan{/highlight} pour obtenir des suggestions sans appliquer de modifications",
  "tui.tips.subagent":
    "Utilisez {highlight}@agent-name{/highlight} dans les invites pour invoquer des sous-agents spécialisés",
  "tui.tips.cycle_sessions":
    "Appuyez sur {highlight}Ctrl+X Right/Left{/highlight} pour parcourir les sessions parent et enfant",
  "tui.tips.config_files":
    "Créez {highlight}encode.json{/highlight} pour la configuration serveur et {highlight}tui.json{/highlight} pour le TUI",
  "tui.tips.global_config":
    "Placez les paramètres TUI dans {highlight}~/.config/encode/tui.json{/highlight} comme configuration globale",
  "tui.tips.schema": "Ajoutez {highlight}$schema{/highlight} à votre config pour l'auto-complétion dans l'éditeur",
  "tui.tips.default_model": "Configurez {highlight}model{/highlight} dans la config pour définir le modèle par défaut",
  "tui.tips.keybinds":
    "Remplacez n'importe quel raccourci dans {highlight}tui.json{/highlight} via la section {highlight}keybinds{/highlight}",
  "tui.tips.disable_keybind":
    "Définissez un raccourci sur {highlight}none{/highlight} pour le désactiver complètement",
  "tui.tips.mcp_config":
    "Configurez les serveurs MCP locaux ou distants dans la section {highlight}mcp{/highlight}",
  "tui.tips.mcp_oauth":
    "encode gère automatiquement OAuth pour les serveurs MCP distants nécessitant une authentification",
  "tui.tips.custom_command":
    "Ajoutez des fichiers {highlight}.md{/highlight} dans {highlight}.encode/command/{/highlight} pour définir des invites personnalisées réutilisables",
  "tui.tips.command_args":
    "Utilisez {highlight}$ARGUMENTS{/highlight}, {highlight}$1{/highlight}, {highlight}$2{/highlight} dans les commandes pour des entrées dynamiques",
  "tui.tips.command_backticks":
    "Utilisez des backticks dans les commandes pour injecter la sortie shell (ex. {highlight}`git status`{/highlight})",
  "tui.tips.custom_agent":
    "Ajoutez des fichiers {highlight}.md{/highlight} dans {highlight}.encode/agent/{/highlight} pour des personas IA spécialisés",
  "tui.tips.agent_perms":
    "Configurez par agent les permissions des outils {highlight}edit{/highlight}, {highlight}bash{/highlight} et {highlight}webfetch{/highlight}",
  "tui.tips.bash_allow":
    'Utilisez des motifs comme {highlight}"git *": "allow"{/highlight} pour des permissions bash fines',
  "tui.tips.bash_deny":
    'Définissez {highlight}"rm -rf *": "deny"{/highlight} pour bloquer les commandes destructrices',
  "tui.tips.bash_ask":
    'Configurez {highlight}"git push": "ask"{/highlight} pour exiger une confirmation avant le push',
  "tui.tips.formatter": "encode formate automatiquement les fichiers avec prettier, gofmt, ruff, etc.",
  "tui.tips.disable_formatter":
    'Définissez {highlight}"formatter": false{/highlight} dans la config pour désactiver le formatage automatique',
  "tui.tips.custom_formatter":
    "Définissez des commandes de formatage personnalisées par extension de fichier dans la config",
  "tui.tips.lsp": "encode utilise des serveurs LSP pour une analyse de code intelligente",
  "tui.tips.custom_tool":
    "Créez des fichiers {highlight}.ts{/highlight} dans {highlight}.encode/tools/{/highlight} pour définir de nouveaux outils LLM",
  "tui.tips.tool_scripts": "Les définitions d'outils peuvent invoquer des scripts en Python, Go, etc.",
  "tui.tips.plugins":
    "Ajoutez des fichiers {highlight}.ts{/highlight} dans {highlight}.encode/plugin/{/highlight} pour des hooks d'événements",
  "tui.tips.plugin_notify":
    "Utilisez des plugins pour envoyer des notifications système à la fin des sessions",
  "tui.tips.plugin_protect":
    "Créez un plugin pour empêcher encode de lire des fichiers sensibles",
  "tui.tips.run": "Utilisez {highlight}Encode run{/highlight} pour des scripts non interactifs",
  "tui.tips.continue": "Utilisez {highlight}Encode --continue{/highlight} pour reprendre la dernière session",
  "tui.tips.attach_cli":
    "Utilisez {highlight}Encode run -f file.ts{/highlight} pour joindre des fichiers via la CLI",
  "tui.tips.format_json":
    "Utilisez {highlight}--format json{/highlight} pour une sortie lisible par machine dans les scripts",
  "tui.tips.serve": "Exécutez {highlight}Encode serve{/highlight} pour exposer l'API encode en mode headless",
  "tui.tips.attach_server":
    "Utilisez {highlight}Encode run --attach{/highlight} pour vous connecter à un serveur en cours",
  "tui.tips.upgrade": "Exécutez {highlight}Encode upgrade{/highlight} pour passer à la dernière version",
  "tui.tips.auth_list":
    "Exécutez {highlight}Encode auth list{/highlight} pour voir tous les fournisseurs configurés",
  "tui.tips.agent_create":
    "Exécutez {highlight}Encode agent create{/highlight} pour créer un agent en mode guidé",
  "tui.tips.github_trigger":
    "Utilisez {highlight}/opencode{/highlight} dans les issues/PR GitHub pour déclencher des actions IA",
  "tui.tips.github_install":
    "Exécutez {highlight}Encode github install{/highlight} pour configurer le workflow GitHub",
  "tui.tips.github_oc":
    "Commentez {highlight}/oc{/highlight} sur une ligne de PR pour une revue ciblée",
  "tui.tips.theme_system":
    'Utilisez {highlight}"theme": "system"{/highlight} pour suivre les couleurs du terminal',
  "tui.tips.theme_files":
    "Créez des fichiers de thème JSON dans le dossier {highlight}.encode/themes/{/highlight}",
  "tui.tips.theme_variants": "Les thèmes prennent en charge des variantes claires/sombres pour les deux modes",
  "tui.tips.theme_ansi": "Référencez les couleurs ANSI 0-255 dans des thèmes personnalisés",
  "tui.tips.env_var":
    "Utilisez la syntaxe {highlight}{env:VAR_NAME}{/highlight} pour référencer des variables d'environnement",
  "tui.tips.file_var":
    "Utilisez {highlight}{file:path}{/highlight} pour inclure le contenu d'un fichier dans la config",
  "tui.tips.instructions":
    "Utilisez {highlight}instructions{/highlight} dans la config pour charger des fichiers de règles supplémentaires",
  "tui.tips.temperature":
    "Réglez la {highlight}temperature{/highlight} de l'agent de 0.0 (focalisé) à 1.0 (créatif)",
  "tui.tips.steps":
    "Configurez {highlight}steps{/highlight} pour limiter les itérations agentiques par requête",
  "tui.tips.disable_tool":
    'Définissez {highlight}"tools": {"bash": false}{/highlight} pour désactiver des outils spécifiques',
  "tui.tips.disable_mcp_tools":
    'Définissez {highlight}"mcp_*": false{/highlight} pour désactiver tous les outils d\'un serveur MCP',
  "tui.tips.tool_override":
    "Remplacez les paramètres globaux des outils dans la configuration de chaque agent",
  "tui.tips.share_auto":
    'Définissez {highlight}"share": "auto"{/highlight} pour partager automatiquement toutes les sessions',
  "tui.tips.share_disabled":
    'Définissez {highlight}"share": "disabled"{/highlight} pour empêcher tout partage de session',
  "tui.tips.unshare":
    "Exécutez {highlight}/unshare{/highlight} pour retirer une session de l'accès public",
  "tui.tips.doom_loop":
    "La permission {highlight}doom_loop{/highlight} prévient les boucles infinies d'appels d'outils",
  "tui.tips.external_dir":
    "La permission {highlight}external_directory{/highlight} protège les fichiers en dehors du projet",
  "tui.tips.debug_config":
    "Exécutez {highlight}Encode debug config{/highlight} pour diagnostiquer la configuration",
  "tui.tips.print_logs":
    "Utilisez l'option {highlight}--print-logs{/highlight} pour afficher des journaux détaillés sur stderr",
  "tui.tips.timeline":
    "Appuyez sur {highlight}Ctrl+X G{/highlight} ou {highlight}/timeline{/highlight} pour aller à un message précis",
  "tui.tips.toggle_code":
    "Appuyez sur {highlight}Ctrl+X H{/highlight} pour afficher/masquer les blocs de code des messages",
  "tui.tips.status":
    "Appuyez sur {highlight}Ctrl+X S{/highlight} ou {highlight}/status{/highlight} pour voir l'état du système",
  "tui.tips.scroll_accel":
    "Activez {highlight}scroll_acceleration{/highlight} dans {highlight}tui.json{/highlight} pour un défilement fluide",
  "tui.tips.username_toggle":
    "Activez/désactivez l'affichage du nom d'utilisateur via la palette de commandes ({highlight}Ctrl+P{/highlight})",
  "tui.tips.docker":
    "Exécutez {highlight}docker run -it --rm ghcr.io/anomalyco/opencode{/highlight} pour une utilisation conteneurisée",
  "tui.tips.zen":
    "Utilisez {highlight}/connect{/highlight} avec Encode pour des modèles testés et sélectionnés",
  "tui.tips.agents_md":
    "Versionnez le fichier {highlight}AGENTS.md{/highlight} de votre projet sur Git pour le partager avec l'équipe",
  "tui.tips.review":
    "Utilisez {highlight}/review{/highlight} pour réviser les modifications non commit, branches ou PR",
  "tui.tips.help":
    "Exécutez {highlight}/help{/highlight} ou {highlight}Ctrl+X H{/highlight} pour ouvrir l'aide",
  "tui.tips.rename": "Utilisez {highlight}/rename{/highlight} pour renommer la session courante",
  "tui.tips.suspend.unix":
    "Appuyez sur {highlight}Ctrl+Z{/highlight} pour suspendre le terminal et revenir au shell",
  "tui.tips.suspend.win": "Appuyez sur {highlight}Ctrl+Z{/highlight} pour annuler les modifications dans l'invite",

  // Command palette UI
  "tui.command.palette.title": "Commandes",
  "tui.command.palette.suggested": "Suggérées",

  // Command categories
  "tui.command.category.session": "Session",
  "tui.command.category.agent": "Agent",
  "tui.command.category.provider": "Fournisseur",
  "tui.command.category.system": "Système",
  "tui.command.category.prompt": "Invite",
  "tui.command.category.internal": "Interne",
  "tui.command.category.external": "Externe",

  // Language switching
  "tui.command.language.switch.title": "Changer de langue",
  "tui.command.language.switch.description": "Modifier la langue d'affichage",
  "tui.command.language.dialog.title": "Changer de langue",
  "tui.language.auto": "Auto (système)",
  "tui.language.current": "Actuelle",

  // App-level commands
  "tui.command.session.list.title": "Changer de session",
  "tui.command.session.new.title": "Nouvelle session",
  "tui.command.workflow.list.title": "Workflows",
  "tui.command.model.list.title": "Changer de modèle",
  "tui.command.model.cycle_recent.title": "Modèles récents",
  "tui.command.model.cycle_recent_reverse.title": "Modèles récents (inverse)",
  "tui.command.model.cycle_favorite.title": "Favoris",
  "tui.command.model.cycle_favorite_reverse.title": "Favoris (inverse)",
  "tui.command.agent.list.title": "Changer d'agent",
  "tui.command.mcp.list.title": "Activer/désactiver MCP",
  "tui.command.never_ask.title_on": "Sans questions : ACTIVÉ �?désactiver (me redemander)",
  "tui.command.never_ask.title_off": "Sans questions : DÉSACTIVÉ �?activer (décider sans demander)",
  "tui.command.never_ask.toast_on":
    "Sans questions ACTIVÉ �?je ne te demanderai rien ; je choisirai moi-même la meilleure option jusqu'à ce que tu le désactives (/never-ask-questions). Les demandes d'autorisation nécessitent toujours ton approbation.",
  "tui.command.never_ask.toast_off": "Sans questions DÉSACTIVÉ �?je te redemanderai aux points de décision.",
  "tui.command.agent.cycle.title": "Cycle d'agents",
  "tui.command.variant.cycle.title": "Cycle de variantes",
  "tui.command.variant.list.title": "Changer de variante de modèle",
  "tui.command.agent.cycle.reverse.title": "Cycle d'agents (inverse)",
  "tui.command.provider.login.title": "Connexion",
  "tui.command.provider.connect.title": "Connecter un fournisseur",
  "tui.command.provider.logout.title": "Déconnexion",
  "tui.command.console.org.switch.title": "Changer d'organisation",
  "tui.command.opencode.status.title": "Voir l'état",
  "tui.command.theme.switch.title": "Changer de thème",
  "tui.command.logo.switch.title": "Changer le design du logo",
  "tui.dialog.logo.title": "Design du logo",
  "tui.dialog.logo.option.classic": "Classique (gras)",
  "tui.dialog.logo.option.thin": "Fin (demi-bloc)",
  "tui.command.theme.switch_mode.to_light": "Passer au mode clair",
  "tui.command.theme.switch_mode.to_dark": "Passer au mode sombre",
  "tui.command.theme.mode.unlock": "Déverrouiller le mode du thème",
  "tui.command.theme.mode.lock": "Verrouiller le mode du thème",
  "tui.command.help.show.title": "Aide",
  "tui.dialog.help.close_hint": "esc/enter",
  "tui.dialog.help.command_list":
    "Appuyez sur {{keybind}} pour voir toutes les actions et commandes disponibles dans n'importe quel contexte.",
  "tui.dialog.help.ok": "OK",
  "tui.dialog.close_hint": "esc",
  "tui.dialog.ok": "OK",
  "tui.dialog.confirm.cancel": "Annuler",
  "tui.dialog.confirm.confirm": "Confirmer",
  "tui.dialog.select.placeholder": "Rechercher",
  "tui.dialog.select.no_results": "Aucun résultat trouvé",
  "tui.dialog.prompt.placeholder": "Saisir du texte",
  "tui.dialog.prompt.busy": "Traitement...",
  "tui.dialog.prompt.processing": "traitement...",
  "tui.dialog.prompt.submit_key": "enter",
  "tui.dialog.prompt.submit_action": "envoyer",
  "tui.dialog.export.title": "Options d'export",
  "tui.dialog.export.filename": "Nom du fichier :",
  "tui.dialog.export.filename_placeholder": "Saisir le nom du fichier",
  "tui.dialog.export.include_thinking": "Inclure la réflexion",
  "tui.dialog.export.include_tool_details": "Inclure les détails des outils",
  "tui.dialog.export.include_assistant_metadata": "Inclure les métadonnées de l'assistant",
  "tui.dialog.export.open_without_saving": "Ouvrir sans enregistrer",
  "tui.dialog.export.hint.toggle_prefix": "Appuyez sur",
  "tui.dialog.export.hint.toggle_action": "pour basculer",
  "tui.dialog.export.hint.confirm_action": "pour confirmer",
  "tui.dialog.export.hint.options_action": "pour les options",
  "tui.toast.copied_to_clipboard": "Copié dans le presse-papiers",
  "tui.toast.instructions_loaded": "Chargé {{files}}",
  "tui.sidebar.instructions": "Instructions",
  "tui.sidebar.cwd": "Répertoire de travail",
  "tui.toast.unknown_error": "Une erreur inconnue s'est produite",
  "tui.command.docs.open.title": "Ouvrir la documentation",
  "tui.command.app.exit.title": "Quitter l'application",
  "tui.command.app.debug.title": "Basculer le panneau de débogage",
  "tui.command.app.console.title": "Basculer la console",
  "tui.command.app.heap_snapshot.title": "Exporter le snapshot du tas",
  "tui.command.terminal.suspend.title": "Suspendre le terminal",
  "tui.command.terminal.title.disable": "Désactiver le titre du terminal",
  "tui.command.terminal.title.enable": "Activer le titre du terminal",
  "tui.command.app.toggle.animations.disable": "Désactiver les animations",
  "tui.command.app.toggle.animations.enable": "Activer les animations",
  "tui.command.app.toggle.diffwrap.disable": "Désactiver le retour à la ligne des diffs",
  "tui.command.app.toggle.diffwrap.enable": "Activer le retour à la ligne des diffs",
  "tui.command.logout.toast": "Déconnecté",

  // Session-level commands
  "tui.command.session.share.title": "Partager la session",
  "tui.command.session.share.copy_link": "Copier le lien de partage",
  "tui.command.session.rename.title": "Renommer la session",
  "tui.command.session.timeline.title": "Aller à un message",
  "tui.command.session.fork.title": "Dupliquer la session",
  "tui.command.session.compact.title": "Compacter la session",
  "tui.command.session.unshare.title": "Annuler le partage",
  "tui.command.session.undo.title": "Annuler le message précédent",
  "tui.command.session.redo.title": "Rétablir",
  "tui.command.session.sidebar.show": "Afficher la barre latérale",
  "tui.command.session.sidebar.hide": "Masquer la barre latérale",
  "tui.command.session.conceal.disable": "Désactiver le masquage du code",
  "tui.command.session.conceal.enable": "Activer le masquage du code",
  "tui.command.session.timestamps.show": "Afficher les horodatages",
  "tui.command.session.timestamps.hide": "Masquer les horodatages",
  "tui.command.session.thinking.expand": "Développer la réflexion",
  "tui.command.session.thinking.collapse": "Réduire la réflexion",
  "tui.command.session.tool_details.show": "Afficher les détails des outils",
  "tui.command.session.tool_details.hide": "Masquer les détails des outils",
  "tui.command.session.scrollbar.toggle": "Basculer la barre de défilement",
  "tui.command.session.generic_tool_output.show": "Afficher la sortie d'outil générique",
  "tui.command.session.generic_tool_output.hide": "Masquer la sortie d'outil générique",
  "tui.command.session.page_up.title": "Page précédente",
  "tui.command.session.page_down.title": "Page suivante",
  "tui.command.session.line_up.title": "Ligne au-dessus",
  "tui.command.session.line_down.title": "Ligne en dessous",
  "tui.command.session.half_page_up.title": "Demi-page vers le haut",
  "tui.command.session.half_page_down.title": "Demi-page vers le bas",
  "tui.command.session.first.title": "Premier message",
  "tui.command.session.last.title": "Dernier message",
  "tui.command.session.last_user.title": "Aller au dernier message utilisateur",
  "tui.command.session.message_next.title": "Message suivant",
  "tui.command.session.message_previous.title": "Message précédent",
  "tui.command.messages.copy.title": "Copier le dernier message de l'assistant",
  "tui.command.session.copy.title": "Copier la transcription",
  "tui.command.session.export.title": "Exporter la transcription",
  "tui.command.session.child_first.title": "Aller à la session enfant",
  "tui.command.session.parent.title": "Aller à la session parente",
  "tui.command.session.child_next.title": "Session enfant suivante",
  "tui.command.session.child_previous.title": "Session enfant précédente",

  // Prompt commands
  "tui.command.prompt.clear.title": "Vider l'invite",
  "tui.command.prompt.submit.title": "Envoyer l'invite",
  "tui.command.prompt.paste.title": "Coller",
  "tui.command.session.interrupt.title": "Interrompre la session",
  "tui.command.prompt.editor.title": "Ouvrir l'éditeur",
  "tui.command.prompt.skills.title": "Compétences",
  "tui.command.voice.toggle.title": "Activer/désactiver la saisie vocale",
  "tui.command.voice.toggle.title_on": "Saisie vocale : activée �?cliquer pour désactiver",
  "tui.command.voice.toggle.title_off": "Saisie vocale : désactivée �?cliquer pour activer",
  "tui.voice.enabled": "Saisie vocale activée (chinois/anglais) �?cliquez sur [Voice] pour enregistrer",
  "tui.voice.disabled": "Saisie vocale désactivée",
  "tui.voice.send.enabled": "Envoi vocal activé �?dites「发送」ou \"send it\" pour envoyer",
  "tui.voice.send.disabled": "Envoi vocal désactivé",
  "tui.command.voice.send.title": "Basculer l'envoi vocal",
  "tui.command.voice.send.title_on": "Envoi vocal : activé �?cliquer pour désactiver",
  "tui.command.voice.send.title_off": "Envoi vocal : désactivé �?cliquer pour activer",
  "tui.voice.control.enabled": "Contrôle vocal activé �?utilise le modèle multimodal pour l'édition intelligente (plus lent)",
  "tui.voice.control.disabled": "Contrôle vocal désactivé �?utilise la transcription ASR rapide",
  "tui.command.voice.control.title": "Basculer le contrôle vocal (multimodal)",
  "tui.command.voice.control.title_on": "Contrôle vocal : activé (multimodal) �?cliquer pour désactiver",
  "tui.command.voice.control.title_off": "Contrôle vocal : désactivé (ASR rapide) �?cliquer pour activer",
  "tui.voice.error.no_auth": "Veuillez d'abord vous connecter à Encode",
  "tui.voice.error.no_recorder": "Aucun outil d'enregistrement trouvé, installez sox",
  "tui.voice.error.too_short": "Enregistrement trop court",
  "tui.voice.error.network": "La transcription a échoué, vérifiez votre réseau",
  "tui.command.prompt.stash.title": "Mettre l'invite de côté",
  "tui.command.prompt.stash.pop.title": "Récupérer l'invite",
  "tui.command.prompt.stash.list.title": "Liste des invites mises de côté",

  // Tips toggle / Plugins
  "tui.command.tips.toggle.show": "Afficher les astuces",
  "tui.command.tips.toggle.hide": "Masquer les astuces",
  "tui.command.plugins.list.title": "Plugins",
  "tui.command.plugins.install.title": "Installer un plugin",

  // Encode Auto (free) �?TUI login dialog
  "tui.dialog.login.Encode_free": "Encode Auto (free)",
  "tui.dialog.login.Encode_free.desc": "Canal anonyme gratuit �?aucune connexion requise",
  "tui.dialog.login.Encode_free.success": "Encode Auto (free) est prêt �?modèle par défaut défini sur Encode/Encode-auto",
  "tui.dialog.login.Encode_free.unavailable": "Fournisseur Encode Auto (free) non chargé",

  // CLI: providers command (auth login)
  "cli.providers.select": "Sélectionner un fournisseur",
  "cli.providers.other": "Autre fournisseur",
  "cli.providers.Encode.recommended_hint": "recommandé",
  "cli.providers.Encode_free.hint": "Canal anonyme gratuit / Encode-auto",
  "cli.providers.Encode_free.verifying": "Vérification du canal Encode Auto (free)...",
  "cli.providers.Encode_free.ready": "Canal Encode Auto (free) prêt",
  "cli.providers.Encode_free.failed": "Échec de la vérification de Encode Auto (free)",
  "cli.providers.Encode_free.default_set": "Modèle par défaut défini sur Encode/Encode-auto (contexte 1M, gratuit)",
  "cli.providers.Encode_free.usage_hint":
    "Aucune connexion requise �?exécutez simplement Encode. Pour les modèles payants/premium, choisissez plutôt la connexion navigateur Encode.",
  "cli.providers.Encode_login.decrypt_retry": "Échec du déchiffrement, veuillez réessayer ({remaining} tentatives restantes)",
  "cli.providers.Encode_login.decrypt_exhausted": "Échec du déchiffrement, nombre maximal de tentatives atteint",

  // Question i18n �?plan_exit
  "tui.question.plan_exit.question": "Le plan {{plan}} est terminé. Voulez-vous basculer vers l'agent build pour commencer l'implémentation ?",
  "tui.question.plan_exit.header": "Quitter le plan",
  "tui.question.plan_exit.option.0.label": "Oui",
  "tui.question.plan_exit.option.0.description": "Basculer vers l'agent build et commencer l'implémentation",
  "tui.question.plan_exit.option.1.label": "Non",
  "tui.question.plan_exit.option.1.description": "Rester avec l'agent plan pour continuer à affiner",

  // Session badges
  "tui.session.badge.auto": "Auto",
} satisfies Partial<Record<Keys, string>>
