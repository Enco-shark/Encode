import { dict as en } from "./en"

type Keys = keyof typeof en

export const dict = {
  // Language names
  "language.en": "English",
  "language.zh": "绠�浣撲腑鏂?,
  "language.zht": "绻侀珨涓枃",
  "language.ko": "頃滉淡鞏?,
  "language.de": "Deutsch",
  "language.es": "Espa帽ol",
  "language.fr": "Fran莽ais",
  "language.da": "Dansk",
  "language.ja": "鏃ユ湰瑾?,
  "language.pl": "Polski",
  "language.ru": "袪褍褋褋泻懈泄",
  "language.ar": "丕賱毓乇亘賷丞",
  "language.no": "Norsk",
  "language.br": "Portugu锚s (Brasil)",
  "language.bs": "Bosanski",
  "language.th": "喙勦笚喔?,
  "language.tr": "T眉rk莽e",

  // Prompt placeholders
  "tui.prompt.placeholder.normal": 'Pregunta lo que quieras... "{{example}}"',
  "tui.prompt.placeholder.shell": 'Ejecuta un comando... "{{example}}"',
  "tui.prompt.ghost": "{{prediction}}  (Tab para aceptar)",
  "tui.home.placeholder.example.todo": "Corregir un TODO en el c贸digo",
  "tui.home.placeholder.example.stack": "驴Cu谩l es el stack t茅cnico del proyecto?",
  "tui.home.placeholder.example.tests": "Arreglar las pruebas fallidas",

  // Prompt bottom hints (trigger characters)
  "tui.prompt.hint.attach_file": "adjuntar archivo",
  "tui.prompt.hint.subagent": "subagente",
  "tui.prompt.hint.commands": "comandos",
  "tui.prompt.hint.switch_mode": "cambiar modo",
  "tui.prompt.hint.settings": "ajustes",

  // Tips
  "tui.tips.label": "Sugerencia",
  "tui.tips.plain_terminal": "Recomendamos usar iTerm o la terminal de VS Code",
  "tui.tips.attach_file":
    "Escribe {highlight}@{/highlight} seguido del nombre de archivo para buscar de forma difusa y adjuntar archivos",
  "tui.tips.shell_prefix":
    "Empieza un mensaje con {highlight}!{/highlight} para ejecutar comandos del shell directamente (p. ej., {highlight}!ls -la{/highlight})",
  "tui.tips.tab_agent":
    "Pulsa {highlight}Tab{/highlight} o {highlight}Shift+Tab{/highlight} para alternar entre los agentes Build, Plan y Compose",
  "tui.tips.theme_mode":
    "Ejecuta {highlight}/dark{/highlight} para el modo oscuro o {highlight}/light{/highlight} para el modo claro",
  "tui.tips.doc": "Ejecuta {highlight}/doc{/highlight} para abrir la documentaci贸n de usuario",
  "tui.tips.free_models": "Modelos gratuitos disponibles por tiempo limitado 鈥?隆pru茅balos ahora!",
  "tui.tips.background":
    "Ejecuta {highlight}/background{/highlight} para usar una imagen personalizada como fondo de inicio",
  "tui.tips.undo":
    "Usa {highlight}/undo{/highlight} para revertir el 煤ltimo mensaje y los cambios en archivos",
  "tui.tips.redo":
    "Usa {highlight}/redo{/highlight} para restaurar mensajes y cambios deshechos previamente",
  "tui.tips.share":
    "Ejecuta {highlight}/share{/highlight} para crear un enlace p煤blico a tu conversaci贸n en opencode.ai",
  "tui.tips.drag_drop": "Arrastra y suelta im谩genes o PDF en el terminal para a帽adirlos como contexto",
  "tui.tips.paste_image":
    "Pulsa {highlight}Ctrl+V{/highlight} para pegar im谩genes desde el portapapeles en la entrada",
  "tui.tips.editor":
    "Pulsa {highlight}Ctrl+X E{/highlight} o {highlight}/editor{/highlight} para componer mensajes en tu editor externo",
  "tui.tips.init":
    "Ejecuta {highlight}/init{/highlight} para autogenerar reglas del proyecto a partir de tu c贸digo",
  "tui.tips.models":
    "Ejecuta {highlight}/models{/highlight} o {highlight}Ctrl+X M{/highlight} para cambiar entre los modelos disponibles",
  "tui.tips.theme":
    "Usa {highlight}/themes{/highlight} o {highlight}Ctrl+X T{/highlight} para alternar entre {{count}} temas integrados",
  "tui.tips.new_session":
    "Pulsa {highlight}Ctrl+X N{/highlight} o {highlight}/new{/highlight} para iniciar una nueva sesi贸n",
  "tui.tips.sessions":
    "Usa {highlight}/sessions{/highlight} o {highlight}Ctrl+X L{/highlight} para listar y continuar conversaciones anteriores",
  "tui.tips.compact":
    "Ejecuta {highlight}/compact{/highlight} para resumir sesiones largas cerca del l铆mite de contexto",
  "tui.tips.export":
    "Pulsa {highlight}Ctrl+X X{/highlight} o {highlight}/export{/highlight} para guardar la conversaci贸n como Markdown",
  "tui.tips.copy_last":
    "Pulsa {highlight}Ctrl+X Y{/highlight} para copiar el 煤ltimo mensaje del asistente al portapapeles",
  "tui.tips.command_palette":
    "Pulsa {highlight}Ctrl+P{/highlight} para ver todas las acciones y comandos disponibles",
  "tui.tips.login":
    "Ejecuta {highlight}/login{/highlight} para iniciar sesi贸n y usar tu plan de tokens",
  "tui.tips.connect":
    "Ejecuta {highlight}/connect{/highlight} para elegir tu proveedor LLM y a帽adir claves API",
  "tui.tips.leader":
    "La tecla l铆der es {highlight}Ctrl+X{/highlight}; comb铆nala con otras teclas para acciones r谩pidas",
  "tui.tips.f2": "Pulsa {highlight}F2{/highlight} para alternar r谩pidamente entre los modelos usados recientemente",
  "tui.tips.sidebar": "Pulsa {highlight}Ctrl+X B{/highlight} para mostrar/ocultar la barra lateral",
  "tui.tips.history":
    "Usa {highlight}PageUp{/highlight}/{highlight}PageDown{/highlight} para navegar por el historial de la conversaci贸n",
  "tui.tips.jump_first":
    "Pulsa {highlight}Ctrl+G{/highlight} o {highlight}Home{/highlight} para ir al inicio de la conversaci贸n",
  "tui.tips.jump_last":
    "Pulsa {highlight}Ctrl+Alt+G{/highlight} o {highlight}End{/highlight} para ir al mensaje m谩s reciente",
  "tui.tips.newline":
    "Pulsa {highlight}Shift+Enter{/highlight} o {highlight}Ctrl+J{/highlight} para a帽adir saltos de l铆nea en la entrada",
  "tui.tips.clear_input":
    "Pulsa {highlight}Ctrl+C{/highlight} mientras escribes para vaciar el campo de entrada",
  "tui.tips.escape": "Pulsa {highlight}Escape{/highlight} para detener la respuesta de la IA en curso",
  "tui.tips.plan_agent":
    "Cambia al agente {highlight}Plan{/highlight} para obtener sugerencias sin aplicar cambios reales",
  "tui.tips.subagent":
    "Usa {highlight}@agent-name{/highlight} en las indicaciones para invocar subagentes especializados",
  "tui.tips.cycle_sessions":
    "Pulsa {highlight}Ctrl+X Right/Left{/highlight} para alternar entre sesiones padre e hija",
  "tui.tips.config_files":
    "Crea {highlight}encode.json{/highlight} para la configuraci贸n del servidor y {highlight}tui.json{/highlight} para la TUI",
  "tui.tips.global_config":
    "Coloca la configuraci贸n de TUI en {highlight}~/.config/encode/tui.json{/highlight} como configuraci贸n global",
  "tui.tips.schema":
    "A帽ade {highlight}$schema{/highlight} a tu configuraci贸n para autocompletado en el editor",
  "tui.tips.default_model":
    "Configura {highlight}model{/highlight} en la config para definir tu modelo por defecto",
  "tui.tips.keybinds":
    "Sobrescribe cualquier atajo en {highlight}tui.json{/highlight} mediante la secci贸n {highlight}keybinds{/highlight}",
  "tui.tips.disable_keybind":
    "Establece un atajo en {highlight}none{/highlight} para deshabilitarlo por completo",
  "tui.tips.mcp_config":
    "Configura servidores MCP locales o remotos en la secci贸n {highlight}mcp{/highlight}",
  "tui.tips.mcp_oauth":
    "encode gestiona autom谩ticamente OAuth para servidores MCP remotos que requieran autenticaci贸n",
  "tui.tips.custom_command":
    "A帽ade archivos {highlight}.md{/highlight} en {highlight}.encode/command/{/highlight} para definir indicaciones personalizadas reutilizables",
  "tui.tips.command_args":
    "Usa {highlight}$ARGUMENTS{/highlight}, {highlight}$1{/highlight}, {highlight}$2{/highlight} en comandos personalizados para entradas din谩micas",
  "tui.tips.command_backticks":
    "Usa comillas invertidas en los comandos para inyectar la salida del shell (p. ej. {highlight}`git status`{/highlight})",
  "tui.tips.custom_agent":
    "A帽ade archivos {highlight}.md{/highlight} en {highlight}.encode/agent/{/highlight} para personajes de IA especializados",
  "tui.tips.agent_perms":
    "Configura por agente los permisos de las herramientas {highlight}edit{/highlight}, {highlight}bash{/highlight} y {highlight}webfetch{/highlight}",
  "tui.tips.bash_allow":
    'Usa patrones como {highlight}"git *": "allow"{/highlight} para permisos de bash m谩s finos',
  "tui.tips.bash_deny":
    'Define {highlight}"rm -rf *": "deny"{/highlight} para bloquear comandos destructivos',
  "tui.tips.bash_ask":
    'Configura {highlight}"git push": "ask"{/highlight} para exigir confirmaci贸n antes de hacer push',
  "tui.tips.formatter": "encode formatea archivos autom谩ticamente con prettier, gofmt, ruff y m谩s",
  "tui.tips.disable_formatter":
    'Define {highlight}"formatter": false{/highlight} en la config para desactivar el formato autom谩tico',
  "tui.tips.custom_formatter":
    "Define comandos de formateo personalizados por extensi贸n de archivo en la configuraci贸n",
  "tui.tips.lsp": "encode usa servidores LSP para an谩lisis inteligente de c贸digo",
  "tui.tips.custom_tool":
    "Crea archivos {highlight}.ts{/highlight} en {highlight}.encode/tools/{/highlight} para definir nuevas herramientas LLM",
  "tui.tips.tool_scripts":
    "Las definiciones de herramientas pueden invocar scripts en Python, Go, etc.",
  "tui.tips.plugins":
    "A帽ade archivos {highlight}.ts{/highlight} en {highlight}.encode/plugin/{/highlight} para enganchar eventos",
  "tui.tips.plugin_notify":
    "Usa plugins para enviar notificaciones del sistema cuando termine una sesi贸n",
  "tui.tips.plugin_protect":
    "Crea un plugin que impida a encode leer archivos sensibles",
  "tui.tips.run":
    "Usa {highlight}Encode run{/highlight} para scripting no interactivo",
  "tui.tips.continue":
    "Usa {highlight}Encode --continue{/highlight} para retomar la 煤ltima sesi贸n",
  "tui.tips.attach_cli":
    "Usa {highlight}Encode run -f file.ts{/highlight} para adjuntar archivos v铆a CLI",
  "tui.tips.format_json":
    "Usa {highlight}--format json{/highlight} para obtener salida legible por m谩quina en scripts",
  "tui.tips.serve":
    "Ejecuta {highlight}Encode serve{/highlight} para acceso headless a la API de encode",
  "tui.tips.attach_server":
    "Usa {highlight}Encode run --attach{/highlight} para conectarte a un servidor en ejecuci贸n",
  "tui.tips.upgrade":
    "Ejecuta {highlight}Encode upgrade{/highlight} para actualizar a la 煤ltima versi贸n",
  "tui.tips.auth_list":
    "Ejecuta {highlight}Encode auth list{/highlight} para ver todos los proveedores configurados",
  "tui.tips.agent_create":
    "Ejecuta {highlight}Encode agent create{/highlight} para crear un agente con asistente guiado",
  "tui.tips.github_trigger":
    "Usa {highlight}/opencode{/highlight} en issues/PR de GitHub para disparar acciones de IA",
  "tui.tips.github_install":
    "Ejecuta {highlight}Encode github install{/highlight} para configurar el workflow de GitHub",
  "tui.tips.github_oc":
    "Comenta {highlight}/oc{/highlight} en l铆neas de c贸digo de un PR para revisiones puntuales",
  "tui.tips.theme_system":
    'Usa {highlight}"theme": "system"{/highlight} para seguir los colores de tu terminal',
  "tui.tips.theme_files":
    "Crea archivos JSON de tema en el directorio {highlight}.encode/themes/{/highlight}",
  "tui.tips.theme_variants": "Los temas admiten variantes claras/oscuras para ambos modos",
  "tui.tips.theme_ansi": "Referencia colores ANSI 0-255 en temas personalizados",
  "tui.tips.env_var":
    "Usa la sintaxis {highlight}{env:VAR_NAME}{/highlight} para referenciar variables de entorno en la config",
  "tui.tips.file_var":
    "Usa {highlight}{file:path}{/highlight} para incluir el contenido de un archivo en valores de la config",
  "tui.tips.instructions":
    "Usa {highlight}instructions{/highlight} en la config para cargar archivos de reglas adicionales",
  "tui.tips.temperature":
    "Ajusta la {highlight}temperature{/highlight} del agente desde 0.0 (enfocado) hasta 1.0 (creativo)",
  "tui.tips.steps":
    "Configura {highlight}steps{/highlight} para limitar las iteraciones ag茅nticas por petici贸n",
  "tui.tips.disable_tool":
    'Define {highlight}"tools": {"bash": false}{/highlight} para deshabilitar herramientas concretas',
  "tui.tips.disable_mcp_tools":
    'Define {highlight}"mcp_*": false{/highlight} para deshabilitar todas las herramientas de un servidor MCP',
  "tui.tips.tool_override":
    "Sobrescribe la configuraci贸n global de herramientas en cada agente",
  "tui.tips.share_auto":
    'Define {highlight}"share": "auto"{/highlight} para compartir todas las sesiones autom谩ticamente',
  "tui.tips.share_disabled":
    'Define {highlight}"share": "disabled"{/highlight} para impedir cualquier compartici贸n de sesiones',
  "tui.tips.unshare":
    "Ejecuta {highlight}/unshare{/highlight} para retirar una sesi贸n del acceso p煤blico",
  "tui.tips.doom_loop":
    "El permiso {highlight}doom_loop{/highlight} previene bucles infinitos de llamadas a herramientas",
  "tui.tips.external_dir":
    "El permiso {highlight}external_directory{/highlight} protege archivos fuera del proyecto",
  "tui.tips.debug_config":
    "Ejecuta {highlight}Encode debug config{/highlight} para diagnosticar problemas de configuraci贸n",
  "tui.tips.print_logs":
    "Usa la opci贸n {highlight}--print-logs{/highlight} para ver logs detallados en stderr",
  "tui.tips.timeline":
    "Pulsa {highlight}Ctrl+X G{/highlight} o {highlight}/timeline{/highlight} para saltar a un mensaje concreto",
  "tui.tips.toggle_code":
    "Pulsa {highlight}Ctrl+X H{/highlight} para alternar la visibilidad de los bloques de c贸digo",
  "tui.tips.status":
    "Pulsa {highlight}Ctrl+X S{/highlight} o {highlight}/status{/highlight} para ver el estado del sistema",
  "tui.tips.scroll_accel":
    "Activa {highlight}scroll_acceleration{/highlight} en {highlight}tui.json{/highlight} para un desplazamiento suave",
  "tui.tips.username_toggle":
    "Activa/desactiva la visualizaci贸n del nombre de usuario desde la paleta de comandos ({highlight}Ctrl+P{/highlight})",
  "tui.tips.docker":
    "Ejecuta {highlight}docker run -it --rm ghcr.io/anomalyco/opencode{/highlight} para uso en contenedor",
  "tui.tips.zen":
    "Usa {highlight}/connect{/highlight} con Encode para modelos seleccionados y probados",
  "tui.tips.agents_md":
    "Sube el {highlight}AGENTS.md{/highlight} de tu proyecto a Git para compartirlo con el equipo",
  "tui.tips.review":
    "Usa {highlight}/review{/highlight} para revisar cambios sin commit, ramas o PR",
  "tui.tips.help":
    "Ejecuta {highlight}/help{/highlight} o {highlight}Ctrl+X H{/highlight} para abrir el di谩logo de ayuda",
  "tui.tips.rename":
    "Usa {highlight}/rename{/highlight} para renombrar la sesi贸n actual",
  "tui.tips.suspend.unix":
    "Pulsa {highlight}Ctrl+Z{/highlight} para suspender el terminal y volver al shell",
  "tui.tips.suspend.win":
    "Pulsa {highlight}Ctrl+Z{/highlight} para deshacer cambios en la entrada",

  // Command palette UI
  "tui.command.palette.title": "Comandos",
  "tui.command.palette.suggested": "Sugeridos",

  // Command categories
  "tui.command.category.session": "Sesi贸n",
  "tui.command.category.agent": "Agente",
  "tui.command.category.provider": "Proveedor",
  "tui.command.category.system": "Sistema",
  "tui.command.category.prompt": "Entrada",
  "tui.command.category.internal": "Interno",
  "tui.command.category.external": "Externo",

  // Language switching
  "tui.command.language.switch.title": "Cambiar idioma",
  "tui.command.language.switch.description": "Cambiar el idioma de la interfaz",
  "tui.command.language.dialog.title": "Cambiar idioma",
  "tui.language.auto": "Auto (sistema)",
  "tui.language.current": "Actual",

  // App-level commands
  "tui.command.session.list.title": "Cambiar sesi贸n",
  "tui.command.session.new.title": "Nueva sesi贸n",
  "tui.command.workflow.list.title": "Flujos de trabajo",
  "tui.command.model.list.title": "Cambiar modelo",
  "tui.command.model.cycle_recent.title": "Ciclo de modelos",
  "tui.command.model.cycle_recent_reverse.title": "Ciclo de modelos (inverso)",
  "tui.command.model.cycle_favorite.title": "Ciclo de favoritos",
  "tui.command.model.cycle_favorite_reverse.title": "Ciclo de favoritos (inverso)",
  "tui.command.agent.list.title": "Cambiar agente",
  "tui.command.mcp.list.title": "Alternar MCP",
  "tui.command.never_ask.title_on": "Sin preguntas: ACTIVADO 鈥?desactivar (volver a preguntarme)",
  "tui.command.never_ask.title_off": "Sin preguntas: DESACTIVADO 鈥?activar (decidir sin preguntar)",
  "tui.command.never_ask.toast_on":
    "Sin preguntas ACTIVADO 鈥?no te preguntar茅; elegir茅 la mejor opci贸n yo mismo hasta que lo desactives (/never-ask-questions). Las solicitudes de permiso siguen requiriendo tu aprobaci贸n.",
  "tui.command.never_ask.toast_off": "Sin preguntas DESACTIVADO 鈥?volver茅 a preguntarte en los puntos de decisi贸n.",
  "tui.command.agent.cycle.title": "Ciclo de agentes",
  "tui.command.variant.cycle.title": "Ciclo de variantes",
  "tui.command.variant.list.title": "Cambiar variante de modelo",
  "tui.command.agent.cycle.reverse.title": "Ciclo de agentes (inverso)",
  "tui.command.provider.login.title": "Iniciar sesi贸n",
  "tui.command.provider.connect.title": "Conectar proveedor",
  "tui.command.provider.logout.title": "Cerrar sesi贸n",
  "tui.command.console.org.switch.title": "Cambiar de organizaci贸n",
  "tui.command.opencode.status.title": "Ver estado",
  "tui.command.theme.switch.title": "Cambiar tema",
  "tui.command.logo.switch.title": "Cambiar dise帽o de logo",
  "tui.dialog.logo.title": "Dise帽o de logo",
  "tui.dialog.logo.option.classic": "Cl谩sico (negrita)",
  "tui.dialog.logo.option.thin": "Fino (medio bloque)",
  "tui.command.theme.switch_mode.to_light": "Cambiar a modo claro",
  "tui.command.theme.switch_mode.to_dark": "Cambiar a modo oscuro",
  "tui.command.theme.mode.unlock": "Desbloquear modo del tema",
  "tui.command.theme.mode.lock": "Bloquear modo del tema",
  "tui.command.help.show.title": "Ayuda",
  "tui.dialog.help.close_hint": "esc/enter",
  "tui.dialog.help.command_list": "Pulsa {{keybind}} para ver todas las acciones y comandos disponibles en cualquier contexto.",
  "tui.dialog.help.ok": "Aceptar",
  "tui.dialog.close_hint": "esc",
  "tui.dialog.ok": "Aceptar",
  "tui.dialog.confirm.cancel": "Cancelar",
  "tui.dialog.confirm.confirm": "Confirmar",
  "tui.dialog.select.placeholder": "Buscar",
  "tui.dialog.select.no_results": "No se encontraron resultados",
  "tui.dialog.prompt.placeholder": "Introduce texto",
  "tui.dialog.prompt.busy": "Trabajando...",
  "tui.dialog.prompt.processing": "procesando...",
  "tui.dialog.prompt.submit_key": "enter",
  "tui.dialog.prompt.submit_action": "enviar",
  "tui.dialog.export.title": "Opciones de exportaci贸n",
  "tui.dialog.export.filename": "Nombre de archivo:",
  "tui.dialog.export.filename_placeholder": "Introduce el nombre de archivo",
  "tui.dialog.export.include_thinking": "Incluir razonamiento",
  "tui.dialog.export.include_tool_details": "Incluir detalles de herramientas",
  "tui.dialog.export.include_assistant_metadata": "Incluir metadatos del asistente",
  "tui.dialog.export.open_without_saving": "Abrir sin guardar",
  "tui.dialog.export.hint.toggle_prefix": "Pulsa",
  "tui.dialog.export.hint.toggle_action": "para alternar",
  "tui.dialog.export.hint.confirm_action": "para confirmar",
  "tui.dialog.export.hint.options_action": "para opciones",
  "tui.toast.copied_to_clipboard": "Copiado al portapapeles",
  "tui.toast.instructions_loaded": "Cargado {{files}}",
  "tui.sidebar.instructions": "Instrucciones",
  "tui.sidebar.cwd": "Directorio de trabajo",
  "tui.toast.unknown_error": "Ha ocurrido un error desconocido",
  "tui.command.docs.open.title": "Abrir documentaci贸n",
  "tui.command.app.exit.title": "Salir de la aplicaci贸n",
  "tui.command.app.debug.title": "Alternar panel de depuraci贸n",
  "tui.command.app.console.title": "Alternar consola",
  "tui.command.app.heap_snapshot.title": "Exportar snapshot del heap",
  "tui.command.terminal.suspend.title": "Suspender terminal",
  "tui.command.terminal.title.disable": "Deshabilitar t铆tulo del terminal",
  "tui.command.terminal.title.enable": "Habilitar t铆tulo del terminal",
  "tui.command.app.toggle.animations.disable": "Deshabilitar animaciones",
  "tui.command.app.toggle.animations.enable": "Habilitar animaciones",
  "tui.command.app.toggle.diffwrap.disable": "Deshabilitar ajuste de diff",
  "tui.command.app.toggle.diffwrap.enable": "Habilitar ajuste de diff",
  "tui.command.logout.toast": "Sesi贸n cerrada",

  // Session-level commands
  "tui.command.session.share.title": "Compartir sesi贸n",
  "tui.command.session.share.copy_link": "Copiar enlace para compartir",
  "tui.command.session.rename.title": "Renombrar sesi贸n",
  "tui.command.session.timeline.title": "Saltar a un mensaje",
  "tui.command.session.fork.title": "Bifurcar sesi贸n",
  "tui.command.session.compact.title": "Compactar sesi贸n",
  "tui.command.session.unshare.title": "Dejar de compartir",
  "tui.command.session.undo.title": "Deshacer mensaje anterior",
  "tui.command.session.redo.title": "Rehacer",
  "tui.command.session.sidebar.show": "Mostrar barra lateral",
  "tui.command.session.sidebar.hide": "Ocultar barra lateral",
  "tui.command.session.conceal.disable": "Deshabilitar ocultaci贸n de c贸digo",
  "tui.command.session.conceal.enable": "Habilitar ocultaci贸n de c贸digo",
  "tui.command.session.timestamps.show": "Mostrar marcas de tiempo",
  "tui.command.session.timestamps.hide": "Ocultar marcas de tiempo",
  "tui.command.session.thinking.expand": "Expandir razonamiento",
  "tui.command.session.thinking.collapse": "Colapsar razonamiento",
  "tui.command.session.tool_details.show": "Mostrar detalles de herramientas",
  "tui.command.session.tool_details.hide": "Ocultar detalles de herramientas",
  "tui.command.session.scrollbar.toggle": "Alternar barra de desplazamiento",
  "tui.command.session.generic_tool_output.show": "Mostrar salida de herramienta gen茅rica",
  "tui.command.session.generic_tool_output.hide": "Ocultar salida de herramienta gen茅rica",
  "tui.command.session.page_up.title": "P谩gina anterior",
  "tui.command.session.page_down.title": "P谩gina siguiente",
  "tui.command.session.line_up.title": "L铆nea arriba",
  "tui.command.session.line_down.title": "L铆nea abajo",
  "tui.command.session.half_page_up.title": "Media p谩gina arriba",
  "tui.command.session.half_page_down.title": "Media p谩gina abajo",
  "tui.command.session.first.title": "Primer mensaje",
  "tui.command.session.last.title": "脷ltimo mensaje",
  "tui.command.session.last_user.title": "Ir al 煤ltimo mensaje del usuario",
  "tui.command.session.message_next.title": "Mensaje siguiente",
  "tui.command.session.message_previous.title": "Mensaje anterior",
  "tui.command.messages.copy.title": "Copiar 煤ltimo mensaje del asistente",
  "tui.command.session.copy.title": "Copiar transcripci贸n de la sesi贸n",
  "tui.command.session.export.title": "Exportar transcripci贸n",
  "tui.command.session.child_first.title": "Ir a la sesi贸n hija",
  "tui.command.session.parent.title": "Ir a la sesi贸n padre",
  "tui.command.session.child_next.title": "Sesi贸n hija siguiente",
  "tui.command.session.child_previous.title": "Sesi贸n hija anterior",

  // Prompt commands
  "tui.command.prompt.clear.title": "Vaciar entrada",
  "tui.command.prompt.submit.title": "Enviar prompt",
  "tui.command.prompt.paste.title": "Pegar",
  "tui.command.session.interrupt.title": "Interrumpir sesi贸n",
  "tui.command.prompt.editor.title": "Abrir editor",
  "tui.command.prompt.skills.title": "Habilidades",
  "tui.command.voice.toggle.title": "Alternar entrada de voz",
  "tui.command.voice.toggle.title_on": "Entrada de voz: activada 鈥?clic para desactivar",
  "tui.command.voice.toggle.title_off": "Entrada de voz: desactivada 鈥?clic para activar",
  "tui.voice.enabled": "Entrada de voz activada (chino/ingl茅s) 鈥?clic en [Voice] para grabar",
  "tui.voice.disabled": "Entrada de voz deshabilitada",
  "tui.voice.send.enabled": "Env铆o por voz habilitado 鈥?di銆屽彂閫併�峯 \"send it\" para enviar",
  "tui.voice.send.disabled": "Env铆o por voz deshabilitado",
  "tui.command.voice.send.title": "Alternar env铆o por voz",
  "tui.command.voice.send.title_on": "Env铆o por voz: activado 鈥?clic para desactivar",
  "tui.command.voice.send.title_off": "Env铆o por voz: desactivado 鈥?clic para activar",
  "tui.voice.control.enabled": "Control de voz habilitado 鈥?usa modelo multimodal para edici贸n inteligente (m谩s lento)",
  "tui.voice.control.disabled": "Control de voz deshabilitado 鈥?usa transcripci贸n ASR r谩pida",
  "tui.command.voice.control.title": "Alternar control de voz (multimodal)",
  "tui.command.voice.control.title_on": "Control de voz: activado (multimodal) 鈥?clic para desactivar",
  "tui.command.voice.control.title_off": "Control de voz: desactivado (ASR r谩pido) 鈥?clic para activar",
  "tui.voice.error.no_auth": "Inicia sesi贸n en Encode primero",
  "tui.voice.error.no_recorder": "No se encontr贸 herramienta de grabaci贸n, instala sox",
  "tui.voice.error.too_short": "Grabaci贸n demasiado corta",
  "tui.voice.error.network": "La transcripci贸n fall贸, verifica tu red",
  "tui.voice.error.empty_send": "No hay contenido para enviar",
  "tui.voice.error.unknown_agent": "Agente \"{{name}}\" no encontrado",
  "tui.command.prompt.stash.title": "Guardar prompt",
  "tui.command.prompt.stash.pop.title": "Recuperar prompt",
  "tui.command.prompt.stash.list.title": "Lista de prompts guardados",

  // Tips toggle / Plugins
  "tui.command.tips.toggle.show": "Mostrar sugerencias",
  "tui.command.tips.toggle.hide": "Ocultar sugerencias",
  "tui.command.plugins.list.title": "Plugins",
  "tui.command.plugins.install.title": "Instalar plugin",

  // Question i18n 鈥?plan_exit
  "tui.question.plan_exit.question": "El plan en {{plan}} est谩 completo. 驴Desea cambiar al agente build para comenzar la implementaci贸n?",
  "tui.question.plan_exit.header": "Salir del plan",
  "tui.question.plan_exit.option.0.label": "S铆",
  "tui.question.plan_exit.option.0.description": "Cambiar al agente build y comenzar la implementaci贸n del plan",
  "tui.question.plan_exit.option.1.label": "No",
  "tui.question.plan_exit.option.1.description": "Permanecer con el agente plan para seguir refinando",

  // Session badges
  "tui.session.badge.auto": "Auto",
} satisfies Partial<Record<Keys, string>>
