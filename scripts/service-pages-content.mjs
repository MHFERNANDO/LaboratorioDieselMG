// Contenido de las páginas de servicio. Solo datos del sitio + explicación técnica general.
export const pages = [
{
  slug: 'inyectores-common-rail-cuenca',
  nav: 'Inyectores Common Rail',
  title: 'Inyectores Common Rail en Cuenca | Laboratorio Diesel MG',
  desc: 'Limpieza, calibración y reparación de inyectores Common Rail (CRDI) en Cuenca, con banco de pruebas y diagnóstico previo del sistema.',
  h1: 'Inyectores Common Rail en Cuenca',
  lead: 'Limpieza, calibración y reparación de inyectores Common Rail (CRDI) en Cuenca, con prueba en banco y diagnóstico previo del sistema.',
  wa: 'inyectores Common Rail',
  serviceName: 'Limpieza, calibración y reparación de inyectores Common Rail',
  images: ['inyectoresCdi-458'],
  sections: [
    ['Qué es un inyector Common Rail', [
      'En un sistema Common Rail el combustible se mantiene a alta presión en un conducto común, llamado riel, y cada inyector lo libera cuando la computadora del motor se lo ordena. A diferencia de los sistemas mecánicos, la presión no depende del giro del motor: la unidad de control decide en qué momento se abre cada inyector y durante cuánto tiempo.',
      'Hay dos familias principales. Los inyectores electromagnéticos se abren con una bobina; los piezoeléctricos lo hacen con un cristal que se expande al recibir corriente y responden más rápido. En ambos casos las piezas internas trabajan con tolerancias de milésimas de milímetro, por eso la reparación exige un banco de pruebas y no se puede juzgar a simple vista.']],
    ['Síntomas habituales de un inyector con falla', [
      'Un inyector que no entrega el caudal correcto o que no pulveriza bien suele manifestarse de varias maneras:',
      ['Arranque difícil o motor que tarda en encender.', 'Humo negro o blanco por el escape.', 'Pérdida de potencia y respuesta lenta al acelerar.', 'Ralentí inestable, vibración o sensación de que el motor "falla".', 'Mayor consumo de combustible.', 'Testigo de motor encendido o códigos de falla almacenados.'],
      'Estos síntomas también pueden venir de otros componentes, como un filtro de combustible saturado, la bomba de alta presión o un sensor. Por eso conviene diagnosticar el sistema antes de reemplazar piezas.']],
    ['Qué hacemos en Laboratorio Diesel MG', [
      'Somos especialistas en la limpieza, calibración y reparación de inyectores (mecánicos, Common Rail, UI y UP), siguiendo los estándares del fabricante. En el caso de los inyectores Common Rail realizamos la calibración electrónica de inyectores piezoeléctricos y electromagnéticos.',
      'Para las pruebas contamos con el banco Dayel, un analizador turco de inyectores diesel, y con el escáner Launch OBD2 para revisar la parte electrónica del sistema. El objetivo es devolverle el rendimiento original a cada componente.']],
    ['En qué consiste la prueba en banco', [
      'El inyector se monta en el banco, se alimenta con líquido de prueba a la presión de trabajo y se comprueban varios puntos: que no gotee cuando está cerrado (estanqueidad), el caudal que entrega en distintos regímenes, la cantidad de retorno, que indica fugas internas, y el patrón de pulverización.',
      'Los resultados se comparan con las especificaciones del fabricante. Si un valor está fuera de rango, se limpia, se repara o se reemplaza la pieza que corresponda, y se vuelve a probar antes de entregarlo.']],
    ['Cada cuánto conviene revisarlos', [
      'No existe un intervalo único: depende del motor, de la calidad del combustible y del mantenimiento. Lo más recomendable es no esperar a una falla grave y revisar el sistema ante los primeros síntomas.',
      'Para cuidarlos, cambie el filtro de combustible cada 5000 km, evite conducir con el tanque casi vacío y consulte qué aditivo limpiador conviene a su vehículo.']],
    ['Cómo solicitar el servicio', [
      'Escríbanos por WhatsApp al taller o a la oficina, cuéntenos el modelo del vehículo y los síntomas que nota, y le indicaremos cómo proceder. El tiempo de reparación varía según el sistema, pero generalmente toma entre 1 y 2 días laborables.']],
  ],
  faq: [
    ['¿Se puede limpiar un inyector Common Rail o hay que cambiarlo?', 'Depende de su estado. Si el problema son depósitos o desgaste leve, la limpieza y la calibración pueden devolverle su funcionamiento; si hay daño interno, se evalúa su reparación o reemplazo después de la prueba en banco.'],
    ['¿Reparan inyectores piezoeléctricos y electromagnéticos?', 'Sí. Realizamos la calibración electrónica de inyectores piezoeléctricos y electromagnéticos, bajo normas de fabricante.'],
    ['¿Cuánto tiempo demora la reparación?', 'El tiempo varía según el sistema, pero generalmente el proceso toma entre 1 y 2 días laborables.'],
    ['¿Qué equipos utilizan para probar los inyectores?', 'Utilizamos el banco Dayel para inyectores diesel y el escáner Launch OBD2 para el diagnóstico electrónico.'],
  ],
},
{
  slug: 'bombas-de-inyeccion-diesel-cuenca',
  nav: 'Bombas de inyección',
  title: 'Bombas de inyección diesel en Cuenca | Laboratorio Diesel MG',
  desc: 'Revisión, ajuste y reparación de bombas de inyección diesel en Cuenca: lineal P, rotativa VE y CRDI, con prueba en banco.',
  h1: 'Bombas de inyección diesel en Cuenca',
  lead: 'Revisión, ajuste y reparación de bombas de inyección diesel en Cuenca: lineal P, rotativa VE y CRDI, con prueba en banco.',
  wa: 'bomba de inyección',
  serviceName: 'Revisión, ajuste y reparación de bombas de inyección diesel',
  images: ['bombaRotativa-480', 'bombaP-327', 'bombaCrdi-342'],
  sections: [
    ['Qué hace la bomba de inyección', [
      'La bomba de inyección toma el combustible del tanque, lo presuriza y lo envía a los inyectores en el momento y en la cantidad que el motor necesita. Si entrega de más, de menos o a destiempo, el motor lo nota de inmediato en potencia, humo y consumo.']],
    ['Tipos de bombas que atendemos', [
      'Bomba lineal P: tiene un elemento de bombeo por cada cilindro, dispuestos en línea, y un gobernador que regula la entrega. Es habitual en motores diesel de gran cilindrada y servicio pesado.',
      'Bomba rotativa VE: un solo elemento distribuye el combustible a todos los cilindros. Es más compacta y común en vehículos livianos y medianos.',
      'Bomba CRDI: es la bomba de alta presión de los sistemas Common Rail. No dosifica cilindro por cilindro, sino que mantiene la presión del riel, y una válvula reguladora controla el caudal.']],
    ['Síntomas habituales de una bomba con falla', [
      'Estos son los signos más comunes de que la bomba necesita revisión:',
      ['Pérdida de potencia o motor que no responde al acelerar.', 'Humo excesivo por el escape.', 'Arranque difícil o motor que se apaga solo.', 'Tirones o funcionamiento irregular a cierta velocidad.', 'Ruidos anormales o fugas de combustible en la bomba.'],
      'Como otros componentes producen señales parecidas, la prueba en banco permite confirmar si el origen es realmente la bomba.']],
    ['Qué hacemos en Laboratorio Diesel MG', [
      'Contamos con bancos de prueba modernos para la revisión y el ajuste de bombas de inyección diesel, de modo que la presión y el flujo sean los correctos para un funcionamiento óptimo del motor.',
      'En bombas rotativas realizamos mantenimiento preventivo y correctivo, en bombas lineales el ajuste de gobernadores y la sincronización de elementos, y en bombas CRDI el reacondicionamiento con calibración de válvulas reguladoras y caudal. Usamos el banco Speedman, de origen brasileño, para las pruebas de caudal, presión y atomización, y el banco Hartridge para sistemas Cummins.']],
    ['En qué consiste la prueba en banco', [
      'La bomba se monta en el banco y se hace girar a distintos regímenes, medidos con precisión. Se verifica el caudal entregado por cada elemento, la presión, el avance y el comportamiento del regulador, y se compara con las especificaciones del fabricante. Con esos datos se decide qué ajustar, reparar o reemplazar, y se repite la prueba para confirmar el resultado.']],
    ['Cada cuánto conviene revisarla', [
      'No hay un plazo fijo, porque depende del uso y de la calidad del combustible. Lo que más protege a la bomba es un combustible limpio: cambie el filtro cada 5000 km, no conduzca con el tanque en reserva, porque se acumulan sedimentos que pueden bloquearla, y revise el sistema apenas aparezcan los primeros síntomas.']],
    ['Cómo solicitar el servicio', [
      'Escríbanos por WhatsApp al taller o a la oficina e indíquenos el modelo del vehículo y el tipo de bomba, si lo conoce. Generalmente el proceso toma entre 1 y 2 días laborables, según el sistema.']],
  ],
  faq: [
    ['¿Qué diferencia hay entre una bomba lineal y una rotativa?', 'La lineal tiene un elemento de bombeo por cilindro y se usa en motores de servicio pesado; la rotativa usa un solo elemento que distribuye el combustible a todos los cilindros y es más compacta.'],
    ['¿Atienden bombas de sistemas Cummins?', 'Sí. Contamos con un banco Hartridge para sistemas Cummins.'],
    ['¿Venden repuestos para bombas de inyección?', 'Disponemos de un amplio stock de repuestos originales para todo tipo de sistema de inyección diesel.'],
    ['¿Cuánto demora la reparación de una bomba?', 'Generalmente entre 1 y 2 días laborables, según el sistema al que pertenece la bomba.'],
  ],
},
{
  slug: 'bomba-vp44-cuenca',
  nav: 'Bomba VP44',
  title: 'Bomba VP44 en Cuenca | Laboratorio Diesel MG',
  desc: 'Reparación de bombas VP44 en Cuenca: módulo electrónico y mecánica interna, con simulador y prueba en banco.',
  h1: 'Reparación de bomba VP44 en Cuenca',
  lead: 'Reparación de bombas VP44 en Cuenca: módulo electrónico y mecánica interna, validadas con simulador y prueba en banco.',
  wa: 'bomba VP44',
  serviceName: 'Reparación de bombas de inyección VP44',
  images: ['bombaVP44-462'],
  sections: [
    ['Qué es la bomba VP44', [
      'La VP44 es una bomba de inyección rotativa de control electrónico. A diferencia de las bombas mecánicas, lleva un módulo electrónico que recibe órdenes de la computadora del motor y regula con precisión el momento y la cantidad de combustible que se inyecta. Por eso combina dos partes que se revisan de forma distinta: la mecánica interna y la electrónica.']],
    ['Síntomas habituales de una VP44 con falla', [
      'Cuando la bomba o su módulo electrónico fallan, el vehículo puede mostrar signos como:',
      ['Motor que se apaga en marcha o que no arranca, a veces solo en caliente.', 'Pérdida de potencia, a menudo intermitente.', 'Tirones o aceleración irregular.', 'Testigo de motor encendido con códigos de falla.', 'Dificultad para arrancar o ralentí inestable.'],
      'Las fallas intermitentes son frecuentes en sistemas electrónicos y justamente por eso requieren equipo de simulación para reproducirlas y confirmarlas.']],
    ['Qué hacemos en Laboratorio Diesel MG', [
      'Realizamos la reparación especializada de módulos electrónicos y de la mecánica interna de bombas VP44, con simulación de banco. Disponemos de un simulador VP44, un sistema especializado que reproduce condiciones reales de funcionamiento para validar cada reparación con exactitud, y del banco Speedman para las pruebas de caudal, presión y atomización de combustible.',
      'Si el vehículo es un diesel de este tipo, puede consultarnos antes de desmontar: con la descripción de los síntomas le orientamos sobre los siguientes pasos.']],
    ['Por qué falla una bomba electrónica', [
      'Las causas más comunes son generales a este tipo de bombas. El calor sostenido castiga al módulo electrónico, y las variaciones de voltaje o una mala conexión pueden provocar fallas intermitentes. En la parte mecánica, el combustible contaminado con agua o impurezas acelera el desgaste, porque el propio diesel es el que lubrica y refrigera las piezas internas.',
      'Por eso, además de reparar la bomba, conviene revisar la causa: un filtro saturado, un tanque con sedimentos o una conexión deficiente pueden volver a dañarla.']],
    ['En qué consiste la prueba con simulador', [
      'Un motor no siempre puede reproducir la falla en el taller, y una bomba electrónica no puede juzgarse solo por su aspecto. El simulador alimenta y comanda la bomba como lo haría la computadora del vehículo, de modo que se puede observar su respuesta, comprobar la entrega de combustible en el banco y verificar que el módulo trabaja de manera estable. Solo entonces se considera validada la reparación.']],
    ['Cada cuánto conviene revisarla', [
      'No existe un intervalo fijo. Lo conveniente es actuar ante los primeros síntomas, antes de que la unidad quede detenida en la carretera. Un combustible limpio ayuda a la parte mecánica: cambie el filtro cada 5000 km y no circule con el tanque casi vacío.']],
    ['Cómo solicitar el servicio', [
      'Escríbanos por WhatsApp al taller e indíquenos el modelo del vehículo y los síntomas. El tiempo de reparación varía según el sistema, pero generalmente toma entre 1 y 2 días laborables. Si la falla aparece solo a veces, descríbanos en qué condiciones ocurre, por ejemplo con el motor caliente o después de un recorrido largo: ese dato ayuda a reproducirla en el banco.']],
  ],
  faq: [
    ['¿Reparan tanto la parte electrónica como la mecánica de la VP44?', 'Sí. Realizamos la reparación especializada de módulos electrónicos y de la mecánica interna, con simulación de banco.'],
    ['¿Para qué sirve el simulador VP44?', 'Simula condiciones reales de funcionamiento de la bomba para validar las reparaciones con exactitud.'],
    ['¿Cuánto tiempo demora?', 'Generalmente entre 1 y 2 días laborables, según el sistema.'],
    ['¿Debo llevar la bomba o el vehículo completo?', 'Escríbanos por WhatsApp con los síntomas y el modelo del vehículo, y le indicaremos cómo proceder.'],
  ],
},
{
  slug: 'diagnostico-computarizado-diesel-cuenca',
  nav: 'Diagnóstico computarizado',
  title: 'Diagnóstico computarizado diesel en Cuenca | Diesel MG',
  desc: 'Diagnóstico computarizado de inyección diesel en Cuenca con escáner Launch OBD2 y opacímetro Bosch para ubicar la falla con precisión.',
  h1: 'Diagnóstico computarizado diesel en Cuenca',
  lead: 'Diagnóstico computarizado del sistema de inyección diesel en Cuenca, con escáner Launch OBD2 y opacímetro Bosch.',
  wa: 'diagnóstico computarizado',
  serviceName: 'Diagnóstico computarizado de inyección diesel',
  images: [],
  sections: [
    ['Qué es el diagnóstico computarizado', [
      'Los motores diesel modernos son controlados por una computadora, la unidad de control (ECU), que lee sensores y comanda inyectores, válvulas y bombas. Cuando algo sale de lo normal, esa computadora guarda un código de falla y, muchas veces, enciende el testigo del tablero.',
      'El diagnóstico computarizado consiste en conectar un escáner al vehículo para leer esos códigos, observar los datos en tiempo real y distinguir si el problema está en un sensor, en un actuador, en el cableado o en un componente mecánico. Es el primer paso para no cambiar piezas por intuición.']],
    ['Cuándo conviene hacerlo', [
      'Conviene un diagnóstico cuando el vehículo presenta alguno de estos síntomas:',
      ['El testigo de motor se enciende.', 'Pérdida de potencia o respuesta lenta al acelerar.', 'Humo excesivo por el escape.', 'Arranque difícil, ralentí inestable o tirones.', 'Aumento notable del consumo de combustible.'],
      'También es útil después de una reparación, para confirmar que el sistema quedó funcionando como debe.']],
    ['Qué hacemos en Laboratorio Diesel MG', [
      'Utilizamos escáneres y equipos de diagnóstico para identificar con precisión las fallas del sistema de inyección electrónica. La idea es ahorrar tiempo y dinero con diagnósticos exactos desde la primera revisión.',
      'Contamos con un escáner Launch OBD2 y con un opacímetro Bosch, parte de los equipos que utilizamos para las pruebas. Cuando el origen de la falla está en un inyector o en una bomba, se continúa con la prueba en banco correspondiente.']],
    ['Cómo se desarrolla una revisión', [
      'Primero se conversa sobre los síntomas: cuándo aparecen, si ocurren en frío o en caliente y si hubo reparaciones recientes. Luego se conecta el escáner y se leen los códigos de falla almacenados. Después se observan los datos en tiempo real, como la presión de combustible, las temperaturas y las señales de los sensores, y se comparan con valores normales.',
      'Si los datos apuntan a un inyector, a una bomba o a un actuador, se confirma el componente con la prueba correspondiente antes de recomendar una reparación.']],
    ['Qué mide el opacímetro', [
      'La opacidad es la cantidad de luz que el humo del escape logra bloquear. Un opacímetro mide ese valor de forma objetiva, lo que permite saber si la combustión es correcta y detectar, por ejemplo, inyectores que pulverizan mal o un exceso de combustible. Es una referencia numérica que complementa lo que se observa a simple vista.']],
    ['Cada cuánto conviene revisarlo', [
      'No hay una frecuencia única. Una revisión periódica ayuda a detectar problemas antes de que se conviertan en averías, y es imprescindible ante cualquier síntoma o luz de advertencia. Un buen mantenimiento reduce las fallas: cambie el filtro de combustible cada 5000 km y utilice combustible de calidad.']],
    ['Cómo solicitar el servicio', [
      'Escríbanos por WhatsApp al taller o a la oficina y cuéntenos qué síntomas nota y de qué vehículo se trata. Dentro de nuestros horarios establecidos, trabajamos para que su vehículo vuelva a operar lo antes posible.']],
  ],
  faq: [
    ['¿Qué equipos utilizan para el diagnóstico?', 'Contamos con un escáner Launch OBD2 y un opacímetro Bosch, además de los bancos de prueba para inyectores y bombas.'],
    ['¿El diagnóstico sirve si el testigo de motor está apagado?', 'Sí. Hay fallas que causan síntomas, como pérdida de potencia o humo, sin encender ningún testigo, y el diagnóstico ayuda a ubicarlas.'],
    ['¿Qué pasa si la falla está en un inyector o en la bomba?', 'Se continúa con la prueba en banco correspondiente para confirmar el componente y decidir su reparación.'],
    ['¿Cuánto tiempo demora una reparación posterior?', 'El tiempo varía según el sistema, pero generalmente toma entre 1 y 2 días laborables.'],
  ],
},
{
  slug: 'limpieza-inyectores-ultrasonido-cuenca',
  nav: 'Limpieza de inyectores',
  title: 'Limpieza de inyectores por ultrasonido en Cuenca | Diesel MG',
  desc: 'Limpieza ultrasónica de inyectores a gasolina en Cuenca: elimina depósitos de carbón sin dañar los componentes de precisión.',
  h1: 'Limpieza de inyectores por ultrasonido en Cuenca',
  lead: 'Limpieza ultrasónica de inyectores a gasolina en Cuenca, con banco específico para comprobar su funcionamiento.',
  wa: 'limpieza de inyectores a gasolina',
  serviceName: 'Limpieza ultrasónica de inyectores a gasolina',
  images: [],
  sections: [
    ['Qué es la limpieza por ultrasonido', [
      'Con el uso, los inyectores acumulan depósitos de carbón y barniz en la punta y en los conductos internos. Esos depósitos alteran la cantidad de combustible y la forma del chorro, y el motor lo refleja en su funcionamiento.',
      'La limpieza por ultrasonido sumerge el inyector en un líquido y lo somete a vibraciones de alta frecuencia. Esas vibraciones forman microburbujas que, al colapsar, desprenden la suciedad adherida, incluso en zonas donde un cepillo o un aditivo no alcanzan. Es un método suave, que no requiere desarmar las piezas de precisión.']],
    ['Síntomas habituales de inyectores sucios', [
      'Estas señales suelen indicar que los inyectores necesitan limpieza:',
      ['Ralentí inestable o motor que vibra.', 'Tirones al acelerar.', 'Arranque difícil, sobre todo en frío.', 'Pérdida de potencia.', 'Mayor consumo de combustible.'],
      'Como otras causas pueden producir síntomas parecidos, es conveniente comprobar el estado de los inyectores antes de decidir.']],
    ['Qué hacemos en Laboratorio Diesel MG', [
      'Contamos con un equipo de ultrasonido para inyectores que realiza la limpieza ultrasónica de inyectores a gasolina y elimina los depósitos de carbón sin dañar los componentes de precisión. Además disponemos de un banco específico para inyectores a gasolina con el que se verifica su funcionamiento.']],
    ['Por qué se ensucian los inyectores', [
      'Una parte del combustible se quema de forma incompleta en la punta del inyector y deja residuos de carbón. Con el tiempo, también se forman barnices a partir de componentes del combustible que se degradan con el calor. Los combustibles de baja calidad, el almacenamiento prolongado y los trayectos cortos favorecen esa acumulación.']],
    ['Diferencia con los aditivos', [
      'Un aditivo limpiador en el tanque puede ayudar a prevenir depósitos y a mantener el sistema limpio, pero no siempre alcanza para retirar una acumulación ya consolidada. La limpieza por ultrasonido actúa directamente sobre el inyector desmontado y llega a zonas que el combustible no limpia. Ambas medidas se complementan: el ultrasonido recupera el inyector y un buen combustible, junto con un filtro en buen estado, ayuda a conservarlo.']],
    ['Cómo se verifica el resultado', [
      'Un inyector limpio no basta si no entrega lo que debe. Por eso se comprueba en banco su caudal, que no gotee cuando está cerrado y que el patrón de pulverización sea uniforme. Si alguna medición sigue fuera de lo esperado, el inyector necesita una revisión adicional o un reemplazo.']],
    ['Cada cuánto conviene limpiarlos', [
      'No hay un intervalo único; depende del uso del vehículo y de la calidad del combustible. Lo recomendable es limpiarlos cuando aparecen los síntomas o según lo que indique el manual del fabricante, y mantener el resto del sistema en buen estado. Si el vehículo ya tiene varios años de uso o ha recorrido mucho con combustible de calidad desconocida, una revisión preventiva de los inyectores puede ayudar a detectar el problema antes de que afecte al motor, a los catalizadores y al consumo.']],
    ['Cómo solicitar el servicio', [
      'Escríbanos por WhatsApp al taller con el modelo de su vehículo y los síntomas que nota. Si lo que necesita es el servicio de inyectores diesel, también lo realizamos: vea inyectores Common Rail y bombas de inyección.']],
  ],
  faq: [
    ['¿Limpian inyectores a gasolina?', 'Sí. Realizamos limpieza ultrasónica de inyectores a gasolina, que elimina depósitos de carbón sin dañar los componentes de precisión.'],
    ['¿El ultrasonido daña el inyector?', 'No. Es un método diseñado para limpiar sin dañar los componentes de precisión.'],
    ['¿Cómo saben que el inyector quedó bien?', 'Se comprueba su funcionamiento en un banco específico para inyectores a gasolina.'],
    ['¿Atienden también inyectores diesel?', 'Sí. Atendemos inyectores mecánicos, Common Rail, UI y UP.'],
  ],
},
];
