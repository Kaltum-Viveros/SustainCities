// Navegación Al Login Del Foro //
function irAlForo() {
    window.location.href = 'login-registro.html';
}

// Funcion para Slider 10 Ciudades Más Sostenibles //
// Inicializa los controles del carrusel
function initializeCarousel() {
    const slides = document.querySelectorAll('.slide');
    const prevButton = document.querySelector('.prev');
    const nextButton = document.querySelector('.next');
    let currentIndex = 0;

    function updateSlides() {
        slides.forEach((slide, index) => {
            slide.classList.remove('active');
            if (index === currentIndex) {
                slide.classList.add('active');
            }
        });
    }

    prevButton.addEventListener('click', () => {
        currentIndex = (currentIndex - 1 + slides.length) % slides.length;
        updateSlides();
    });

    nextButton.addEventListener('click', () => {
        currentIndex = (currentIndex + 1) % slides.length;
        updateSlides();
    });
}

const heading = document.getElementById("heading");
const moon = document.getElementById("moon");

window.addEventListener("scroll", () => {
    let value = window.scrollY;

    if (value <= 800) {
        heading.style.marginTop = value * 1.5 + 'px';
        moon.style.right = 10 + value * 0.1 + '%';
    }
});

function setActive(element) {
// Remover la clase 'active' de todos los elementos
const items = document.querySelectorAll('.nav-item');
items.forEach(item => {
item.classList.remove('active');
});

// Agregar la clase 'active' al elemento clickeado
element.classList.add('active');
}

    document.addEventListener('DOMContentLoaded', () => {
        // Selecciona el primer elemento de la barra de navegación
        const firstItem = document.querySelector('.nav-item');
        if (firstItem) {
            // Agrega la clase 'active' al primer elemento
            firstItem.classList.add('active');
        }

        // Añade el evento de clic a cada elemento para que la clase 'active' se actualice
        document.querySelectorAll('.nav-item').forEach(item => {
            item.addEventListener('click', () => {
                setActive(item);
            });
        });
    });

// Funcion para boton Volver en login y Sign Up

function volverInformativa() {
    window.location.href = 'index.html';
}

function volverLogin() {
    window.location.href = 'login.html';
}

$(document).ready(function() {
    console.log('JQuery está trabajando');

    // Mostrar Primera Opción Al Cargar La Página Por Primera Vez //
    ciudadesSostenibles();

    // Método Que Muestra El Contenido Del Botón Ciudades Sostenibles //
    function ciudadesSostenibles (){
        let template_bar = '';
        template_bar += `
                    <h1>Ciudades y Comunidades Sostenibles</h1>

                    <p>Las comunidades y ciudades sostenibles son aquellas que buscan mejorar la calidad de vida de sus habitantes al mismo tiempo que minimizan su impacto negativo en el medio ambiente. Se trata de un modelo de desarrollo urbano que busca un equilibrio entre el crecimiento económico, el cuidado del entorno natural y el bienestar social.</p>

                    <p>
                        Las ciudades representan el futuro del modo de vida global. La población mundial alcanzó los 8000 millones de personas en 2022, de las cuales más de la mitad viven en zonas urbanas. Se prevé que esta cifra aumente y que para 2050 el 70 % de la población vivirá en ciudades.<br/>
                        Aproximadamente 1100 millones de personas viven actualmente en barrios marginales, o en condiciones similares en las ciudades, y se espera que en los próximos 30 años haya 2000 millones más.<br/>    
                        Sin embargo, muchas de estas ciudades no están preparadas para esta rápida urbanización, y el desarrollo de la vivienda, las infraestructuras y los servicios se ve superado, lo que provoca un crecimiento de los barrios marginales o de condiciones similares.<br/>
                        El crecimiento urbano descontrolado, la contaminación atmosférica y la escasez de espacios públicos abiertos persisten en las ciudades.<br/>
                        Desde la implementación de los ODS en 2015 se han realizado grandes progresos y, a día de hoy, el número de países con estrategias nacionales y locales de reducción del riesgo de catástrofes se ha duplicado. No obstante, siguen existiendo problemas y, en 2022, solo la mitad de la población urbana mundial tenía acceso al transporte público.<br/>
                        No es posible alcanzar el desarrollo sostenible sin transformar significativamente la forma en que se construyen y gestionan los espacios urbanos.
                    </p>

                    <h2>¿Qué caracteriza a una comunidad sostenible?</h2>
                    <ul>
                        <li><b>Respeto por el medio ambiente: </b>Priorizan el uso de energías renovables, la gestión eficiente de los recursos naturales (agua, energía), la reducción de residuos y la promoción de la movilidad sostenible. </li>
                        <li><b>Equidad social: </b>Fomentan la inclusión, la participación ciudadana y la cohesión social. Buscan garantizar el acceso a servicios básicos como vivienda, educación y salud para todos sus habitantes.</li>
                        <li><b>Desarrollo económico sostenible: </b>Promueven actividades económicas que generan empleo y riqueza sin comprometer el medio ambiente ni la calidad de vida de las futuras generaciones.</li>
                        <li><b>Infraestructura verde: </b>Integran espacios verdes en la ciudad, como parques y jardines, para mejorar la calidad del aire, reducir la temperatura y fomentar la biodiversidad.</li>
                        <li><b>Movilidad sostenible: </b>Apuestan por el transporte público, la bicicleta y los vehículos eléctricos, reduciendo así la congestión y la contaminación.</li>
                    </ul>

                    <img src="https://imgs.search.brave.com/LBFmU5-51vrgZPOLoT_htWiAYq6O5UtvdJ1zwOsncD4/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9zdGF0/aWMuZXNtYXJ0Y2l0/eS5lcy9tZWRpYS8y/MDI0LzAzL2NpdWRh/ZC1zb3N0ZW5pYmxl/LWVzbWFydGNpdHkt/MjAyNDAzMTQtMTcw/Mi0xMDI0eDU4NS5w/bmc" alt="" class="fotosContenedor"><br/>

                    <h2>Beneficios de vivir en una comunidad sostenible</h2>
                    <ul>
                        <li><b>Mejor calidad de vida: </b>Aire más limpio, menos ruido, más espacios verdes y una mayor sensación de bienestar.</li>
                        <li><b>Reducción del impacto ambiental: </b>Menor consumo de energía y agua, reducción de la emisión de gases de efecto invernadero y protección de la biodiversidad.</li>
                        <li><b>Mayor cohesión social:</b>Fomento de la participación ciudadana, la colaboración y el sentido de comunidad.</li>
                        <li><b>Desarrollo económico a largo plazo: </b>Atracción de inversiones y creación de empleos en sectores sostenibles</li>
                    </ul=>

                    <img src="https://imgs.search.brave.com/rE2CuPEWI3oJ1CjgQBQsP5eAUOdOkm1W-MDSBLZPju4/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93d3cu/cmVwc29sLmNvbS9j/b250ZW50L2RhbS9y/ZXBzb2wtY29ycG9y/YXRlL2VzL3Nvc3Rl/bmliaWxpZGFkL2Np/dWRhZGVzLXNvc3Rl/bmlibGVzMi5qcGcu/dHJhbnNmb3JtL3Jw/LXJlbmRpdGlvbi1t/ZC9pbWFnZS5qcGc" alt="" class="fotosContenedor"><br/>

                    <h2>¿En qué nos afecta?</h2>
                    <p>
                        Con el tiempo, estos problemas afectarán a toda la población. La desigualdad puede generar malestar e inseguridad, la contaminación deteriora la salud de la población y afecta a la productividad de los trabajadores y, por tanto, a la economía, y los desastres naturales pueden alterar el estilo de vida de las personas. La contaminación del aire no es solo un problema urbano que perjudica la salud de millones de personas, sino que también afecta a los pueblos y las zonas rurales.
                    </p> 
                `;

        let contenedor = document.getElementById("contenedor");
        if (contenedor) {
            contenedor.innerHTML = template_bar;
        } else {
            console.error("Element with ID 'contenedor' not found.");
        }
    }

    // Botón Ciudades Sostenibles //
    $(document).on('click', '#ciudadesSostenibles', function() {
        $.ajax({
        url: 'index.html',
        success: ciudadesSostenibles()
        });
    });

    // Botón 10 Ciudades Más Sostenibles //
    $(document).on('click', '#10ciudades', function() {
        $.ajax({
        url: 'index.html',
        success: function(){
                let template_bar = '';
                template_bar += `
                            <h1>10 ciudades más sostenibles</h1>
                            <p>
                                A lo largo del mundo, encontramos ejemplos de ciudades que destacan por su enfoque sostenible, combinando desarrollo y cuidado ambiental. Estos lugares, conocidas como ciudades inteligentes, adoptan tecnologías eficientes que las transforman en ecociudades, promoviendo un equilibrio entre el respeto por el medioambiente y el bienestar de las personas. 
                                En 2022, Arcadis, una destacada firma de consultoría en diseño ecológico y gestión de recursos naturales, llevó a cabo un estudio para identificar las ciudades más sostenibles a nivel global. Este análisis se basó en diversos indicadores relacionados con tres pilares fundamentales: social, ambiental y económico, los cuales están alineados con los Objetivos de Desarrollo Sostenible de la ONU.
                                El informe incluyó un total de 100 ciudades que, cada una a su manera, sirven de ejemplo en la transición hacia una mayor sostenibilidad. Estas ciudades reinvierten sus ganancias en iniciativas sociales y ambientales que buscan mejorar la calidad de vida de sus habitantes. Destacan nombres como Estocolmo, Tokio y Ámsterdam, que han mantenido su presencia en este tipo de rankings desde 2018.
                            </p>

                            <h4>Destacamos 10 ciudades líderes en sostenibilidad a nivel mundial, reconocidas por su habilidad para equilibrar el desarrollo con el respeto por el medioambiente.</h4>

                            <div class="slider">
                                <button class="prev">⟨</button>
                                <div class="slides">
                                    <div class="slide active">
                                        <div class="slide-contenido">
                                            <h2>Oslo (Noruega)</h2> 
                                            <p> 
                                                Oslo lidera en sostenibilidad gracias a su ambicioso objetivo de ser una ciudad neutral en carbono para 2030. Su sistema de transporte público utiliza energía renovable, y sus políticas fomentan la reducción de emisiones mediante zonas libres de autos y una fuerte inversión en infraestructura para bicicletas. 
                                            </p>
                                        </div>
                                        <img src="resources/img/oslo.jpg" alt="Oslo"/>
                                    </div> 

                                    <div class="slide">
                                        <h2>Estocolmo (Suecia)</h2> 
                                        <p> 
                                            Pionera en sostenibilidad, Estocolmo ha implementado planes para convertirse en una ciudad libre de combustibles fósiles para 2040. Destaca por su eficiente gestión de residuos, su amplia red de transporte eléctrico y su integración de la naturaleza dentro del entorno urbano. 
                                        </p>
                                        <img src="resources/img/estocolmo.jpg" alt="Estocolmo"/>
                                    </div> 

                                    <div class="slide">
                                        <h2> Tokio (Japón) </h2> 
                                        <p> 
                                            Tokio combina tecnología avanzada con prácticas sostenibles. Ha implementado iniciativas para reducir el consumo energético en edificios y promover la energía solar. Además, cuenta con extensos programas de reciclaje y áreas verdes como el Parque Yoyogi, que sirven como pulmones urbanos.
                                        </p>
                                        <img src="resources/img/tokio.jpg" alt="Tokio"/>
                                    </div> 

                                    <div class="slide">
                                        <h2> Copenhague (Dinamarca) </h2> 
                                        <p> 
                                            Considerada una de las ciudades más amigables para ciclistas, Copenhague aspira a ser carbono neutral para 2025. Su red de transporte es principalmente eléctrica, y su enfoque en edificios sostenibles y energías renovables la convierten en un modelo global. 
                                        </p>
                                        <img src="resources/img/copenhague.jpg" alt="Copenhague"/>
                                    </div> 

                                    <div class="slide">
                                        <h2> Berlín (Alemania) </h2> 
                                        <p> 
                                            Berlín apuesta por la reutilización de recursos y el desarrollo urbano sostenible. La ciudad fomenta espacios verdes, transporte público eficiente y energía limpia. Además, sus políticas de renovación de edificios priorizan la eficiencia energética. 
                                        </p>
                                        <img src="resources/img/berlin.jpg" alt="Berlin"/>
                                    </div> 

                                    <div class="slide">
                                        <h2> Londres (Reino Unido) </h2> 
                                        <p> 
                                            Londres ha implementado zonas de bajas emisiones para reducir la contaminación. Su infraestructura para bicicletas, expansión de transporte eléctrico y proyectos de reforestación urbana refuerzan su compromiso con la sostenibilidad. 
                                        </p>
                                        <img src="resources/img/londres.jpg" alt="Londres"/>
                                    </div> 

                                    <div class="slide">
                                        <h2> Seattle (Estados Unidos) </h2> 
                                        <p> 
                                            Seattle es conocida por su planificación ambientalmente consciente. Su energía proviene en gran medida de fuentes renovables, y la ciudad incentiva el uso de transporte público, junto con la protección de espacios naturales y su biodiversidad. 
                                        </p>
                                        <img src="resources/img/seattle.jpg" alt="Seattle"/>
                                    </div> 

                                    <div class="slide">
                                        <h2>  París (Francia) </h2> 
                                        <p>     
                                            La capital francesa avanza hacia la sostenibilidad con políticas como la reducción del tráfico vehicular, la expansión de áreas peatonales y un sistema de bicicletas compartidas pionero. París también impulsa proyectos de techos verdes y energías renovables. 
                                        </p>
                                        <img src="resources/img/paris.jpg" alt="Paris"/>
                                    </div> 

                                    <div class="slide">
                                        <h2> San Francisco (Estados Unidos) </h2> 
                                        <p> 
                                            San Francisco lidera en reciclaje y compostaje, logrando desviar gran parte de sus desechos de los vertederos. Además, ha invertido significativamente en energía solar y transporte limpio, con un enfoque en preservar sus espacios naturales. 
                                        </p>
                                        <img src="resources/img/san-francisco.jpg" alt="San Francisco"/>
                                    </div> 

                                    <div class="slide">
                                        <h2> Ámsterdam (Países Bajos) </h2> 
                                        <p> 
                                            Ámsterdam es reconocida por su cultura ciclista y su compromiso con la economía circular. La ciudad promueve proyectos de viviendas sostenibles, energías renovables y un transporte público eficiente que utiliza electricidad y biocombustibles. 
                                        </p>
                                        <img src="resources/img/amsterdam.jpg" alt="Amsterdam"/>
                                    </div> 
                                </div>
                                <button class="next">⟩</button>
                            </div>
                            
                        `; // FALTA DISPLAY GRID Y SLIDER

                let contenedor = document.getElementById("contenedor");
                if (contenedor) {
                    contenedor.innerHTML = template_bar;

                    initializeCarousel(); // Inicializar el carrusel
                } else {
                    console.error("Element with ID 'contenedor' not found.");
                }

                
                
            }   
        });        
    });

    // Botón Cómo Aportar Para Lograr Una Ciudad Sostenible //
    $(document).on('click', '#comoAportar', function() {
        $.ajax({
        url: 'index.html',
        success: function(){
                let template_bar = '';
                template_bar += `
                            <h1>¿Cómo aportar para lograr una ciudad sostenible?</h1>
                            <p> 
                                El Objetivo de Desarrollo Sostenible (ODS) 11 de la ONU se enfoca en crear ciudades y comunidades sostenibles, promoviendo un entorno urbano inclusivo, seguro, resiliente y sostenible. Contribuir a este objetivo implica adoptar prácticas y tomar decisiones que beneficien tanto al medioambiente como a la calidad de vida de las personas. A continuaci[on te sugerimos acciones clave para aportar a una ciudad sostenible:
                            </p>

                            <h2> 1. Promover el transporte sostenible </h2>
                            <ul>
                                <li> Usar medios de transporte público o alternativas como bicicletas y caminatas, reduciendo la dependencia de automóviles privados.</li>
                                <li>Optar por vehículos eléctricos o de baja emisión si necesitas transporte privado.</li>
                                <li>Apoyar y abogar por la expansión de redes de transporte público eficientes y accesibles.</li>
                            </ul>
                            
                            <h2> 2. Impulsar espacios verdes y biodiversidad </h2>
                            <ul>
                                <li> Participar en campañas de reforestación urbana y cuidado de áreas verdes.</li>
                                <li>Promover la creación de jardines comunitarios, techos verdes y muros vegetales para mejorar la calidad del aire y reducir el efecto isla de calor.</li>
                                <li>Fomentar la protección de la flora y fauna local en los planes de desarrollo urbano.</li>
                            </ul>
                            
                            <h2> 3. Adoptar prácticas de consumo responsable </h2>
                            <ul>
                                <li> Reducir, reutilizar y reciclar para minimizar los residuos sólidos urbanos.</li>
                                <li>Apoyar políticas y empresas que prioricen envases reutilizables y materiales sostenibles.</li>
                                <li>Optar por productos locales y de comercio justo, que reduzcan la huella de carbono.</li>
                            </ul>
                            
                            <h2> 4. Abogar por viviendas accesibles y sostenibles </h2>
                            <ul>
                                <li> Impulsar proyectos que ofrezcan viviendas asequibles y bien planificadas, integradas con servicios esenciales como agua, electricidad y saneamiento.</li>
                                <li>Promover el uso de materiales de construcción sostenibles y tecnologías de eficiencia energética en edificios.</li>
                            </ul>
                            
                            <h2> 5. Mejorar la resiliencia ante desastres </h2>
                            <ul>
                                <li> Apoyar iniciativas de planificación urbana que consideren riesgos climáticos y naturales, como inundaciones, terremotos o tormentas. </li>
                                <li>Fomentar la educación comunitaria sobre gestión de riesgos y desastres.</li>
                                <li>Colaborar en la implementación de infraestructuras resilientes, como sistemas de drenaje sostenible y estructuras antisísmicas.</li>
                            </ul>
                            
                            <h2> 6. Participar en la planificación urbana inclusiva </h2>
                            <ul>
                                <li> Contribuir a procesos participativos en los que se escuchen las necesidades de diferentes sectores de la sociedad, incluyendo comunidades vulnerables. </li>
                                <li>Apoyar iniciativas que garanticen acceso equitativo a servicios básicos como salud, educación, transporte y cultura.</li>
                            </ul>
                            
                            <h2> 7. Promover el uso de energía limpia </h2>
                            <ul>
                                <li> Usar energías renovables en hogares y negocios, como paneles solares. </li>
                                <li> Reducir el consumo energético mediante tecnologías eficientes, como bombillas LED y electrodomésticos con certificación energética. </li>
                                <li> Participar en programas que promuevan la transición a fuentes de energía limpias a nivel local.</li>
                            </ul>
                            
                            <h2> 8. Fomentar la innovación tecnológica sostenible </h2>
                            <ul>
                                <li> Apoyar o desarrollar aplicaciones y herramientas tecnológicas que contribuyan a la sostenibilidad urbana, como plataformas para compartir transporte o monitorear el consumo energético.</li>
                                <li> Impulsar el uso de datos abiertos para tomar decisiones urbanas más inteligentes y sostenibles. </li>
                            </ul>
                            
                            <h2> 9. Educar y sensibilizar </h2>
                            <ul>
                                <li> Informar y educar a la comunidad sobre la importancia de las ciudades sostenibles y cómo pueden contribuir. </li>
                                <li> Fomentar actividades escolares y comunitarias que refuercen valores de respeto por el medioambiente. </li>
                            </ul>
                            
                            <h2> 10. Apoyar políticas públicas sostenibles </h2>
                            <ul>
                                <li> Respaldar a líderes y legislaciones que prioricen la sostenibilidad urbana. </li>
                                <li> Participar en consultas públicas y abogar por normas que promuevan el transporte público, la protección de áreas verdes y la reducción de emisiones contaminantes. </li>
                            </ul>
                        `;

                let contenedor = document.getElementById("contenedor");
                if (contenedor) {
                    contenedor.innerHTML = template_bar;
                } else {
                    console.error("Element with ID 'contenedor' not found.");
                }
            }
        });        
    });

    // Botón Datos Destacables //
    $(document).on('click', '#datosDestacables', function() {
        $.ajax({
        url: 'index.html',
        success: function(){
                let template_bar = '';
                template_bar += `
                            <h1>Datos destacables</h1>
                            <p> 
                                El Objetivo de Desarrollo Sostenible (ODS) 11 de la ONU se enfoca en crear ciudades y comunidades sostenibles, promoviendo un entorno urbano inclusivo, seguro, resiliente y sostenible. Contribuir a este objetivo implica adoptar prácticas y tomar decisiones que beneficien tanto al medioambiente como a la calidad de vida de las personas. A continuaci[on te sugerimos acciones clave para aportar a una ciudad sostenible:
                            </p>

                            <h2> 1. Promover el transporte sostenible </h2>
                            <ul>
                                <li> Usar medios de transporte público o alternativas como bicicletas y caminatas, reduciendo la dependencia de automóviles privados.</li>
                                <li>Optar por vehículos eléctricos o de baja emisión si necesitas transporte privado.</li>
                                <li>Apoyar y abogar por la expansión de redes de transporte público eficientes y accesibles.</li>
                            </ul>
                            
                            <h2> 2. Impulsar espacios verdes y biodiversidad </h2>
                            <ul>
                                <li> Participar en campañas de reforestación urbana y cuidado de áreas verdes.</li>
                                <li>Promover la creación de jardines comunitarios, techos verdes y muros vegetales para mejorar la calidad del aire y reducir el efecto isla de calor.</li>
                                <li>Fomentar la protección de la flora y fauna local en los planes de desarrollo urbano.</li>
                            </ul>
                            
                            <h2> 3. Adoptar prácticas de consumo responsable </h2>
                            <ul>
                                <li> Reducir, reutilizar y reciclar para minimizar los residuos sólidos urbanos.</li>
                                <li>Apoyar políticas y empresas que prioricen envases reutilizables y materiales sostenibles.</li>
                                <li>Optar por productos locales y de comercio justo, que reduzcan la huella de carbono.</li>
                            </ul>
                            
                            <h2> 4. Abogar por viviendas accesibles y sostenibles </h2>
                            <ul>
                                <li> Impulsar proyectos que ofrezcan viviendas asequibles y bien planificadas, integradas con servicios esenciales como agua, electricidad y saneamiento.</li>
                                <li>Promover el uso de materiales de construcción sostenibles y tecnologías de eficiencia energética en edificios.</li>
                            </ul>
                            
                            <h2> 5. Mejorar la resiliencia ante desastres </h2>
                            <ul>
                                <li> Apoyar iniciativas de planificación urbana que consideren riesgos climáticos y naturales, como inundaciones, terremotos o tormentas. </li>
                                <li>Fomentar la educación comunitaria sobre gestión de riesgos y desastres.</li>
                                <li>Colaborar en la implementación de infraestructuras resilientes, como sistemas de drenaje sostenible y estructuras antisísmicas.</li>
                            </ul>
                            
                            <h2> 6. Participar en la planificación urbana inclusiva </h2>
                            <ul>
                                <li> Contribuir a procesos participativos en los que se escuchen las necesidades de diferentes sectores de la sociedad, incluyendo comunidades vulnerables. </li>
                                <li>Apoyar iniciativas que garanticen acceso equitativo a servicios básicos como salud, educación, transporte y cultura.</li>
                            </ul>
                            
                            <h2> 7. Promover el uso de energía limpia </h2>
                            <ul>
                                <li> Usar energías renovables en hogares y negocios, como paneles solares. </li>
                                <li> Reducir el consumo energético mediante tecnologías eficientes, como bombillas LED y electrodomésticos con certificación energética. </li>
                                <li> Participar en programas que promuevan la transición a fuentes de energía limpias a nivel local.</li>
                            </ul>
                            
                            <h2> 8. Fomentar la innovación tecnológica sostenible </h2>
                            <ul>
                                <li> Apoyar o desarrollar aplicaciones y herramientas tecnológicas que contribuyan a la sostenibilidad urbana, como plataformas para compartir transporte o monitorear el consumo energético.</li>
                                <li> Impulsar el uso de datos abiertos para tomar decisiones urbanas más inteligentes y sostenibles. </li>
                            </ul>
                            
                            <h2> 9. Educar y sensibilizar </h2>
                            <ul>
                                <li> Informar y educar a la comunidad sobre la importancia de las ciudades sostenibles y cómo pueden contribuir. </li>
                                <li> Fomentar actividades escolares y comunitarias que refuercen valores de respeto por el medioambiente. </li>
                            </ul>
                            
                            <h2> 10. Apoyar políticas públicas sostenibles </h2>
                            <ul>
                                <li> Respaldar a líderes y legislaciones que prioricen la sostenibilidad urbana. </li>
                                <li> Participar en consultas públicas y abogar por normas que promuevan el transporte público, la protección de áreas verdes y la reducción de emisiones contaminantes. </li>
                            </ul>
                        `;

                let contenedor = document.getElementById("contenedor");
                if (contenedor) {
                    contenedor.innerHTML = template_bar;
                } else {
                    console.error("Element with ID 'contenedor' not found.");
                }
            }
        });        
    });

    // Botón Metas //
    $(document).on('click', '#metas', function() {
        $.ajax({
        url: 'index.html',
        success: function(){
                let template_bar = '';
                template_bar += `
                            <h1>Metas</h1>

                            <p>El Objetivo de Desarrollo Sostenible (ODS) 11 de la ONU tiene como objetivos...</p>
                            <ol>
                                <li>De aquí a 2030, asegurar el acceso de todas las personas a viviendas y servicios básicos adecuados, seguros y asequibles y mejorar los barrios marginales.</li>
                                <li>De aquí a 2030, proporcionar acceso a sistemas de transporte seguros, asequibles, accesibles y sostenibles para todos y mejorar la seguridad vial, en particular mediante la ampliación del transporte público, prestando especial atención a las necesidades de las personas en situación de vulnerabilidad, las mujeres, los niños, las personas con discapacidad y las personas de edad.</li>
                                <li>De aquí a 2030, aumentar la urbanización inclusiva y sostenible y la capacidad para la planificación y la gestión participativas, integradas y sostenibles de los asentamientos humanos en todos los países.</li>
                                <li>Redoblar los esfuerzos para proteger y salvaguardar el patrimonio cultural y natural del mundo.</li>
                                <li>De aquí a 2030, reducir significativamente el número de muertes causadas por los desastres, incluidos los relacionados con el agua, y de personas afectadas por ellos, y reducir considerablemente las pérdidas económicas directas provocadas por los desastres en comparación con el producto interno bruto mundial, haciendo especial hincapié en la protección de los pobres y las personas en situaciones de vulnerabilidad.</li>
                                <li>De aquí a 2030, reducir el impacto ambiental negativo per capita de las ciudades, incluso prestando especial atención a la calidad del aire y la gestión de los desechos municipales y de otro tipo.</li>
                                <li>De aquí a 2030, proporcionar acceso universal a zonas verdes y espacios públicos seguros, inclusivos y accesibles, en particular para las mujeres y los niños, las personas de edad y las personas con discapacidad.</li>
                                <li>Apoyar los vínculos económicos, sociales y ambientales positivos entre las zonas urbanas, periurbanas y rurales fortaleciendo la planificación del desarrollo nacional y regional.</li>
                                <li>De aquí a 2020, aumentar considerablemente el número de ciudades y asentamientos humanos que adoptan e implementan políticas y planes integrados para promover la inclusión, el uso eficiente de los recursos, la mitigación del cambio climático y la adaptación a él y la resiliencia ante los desastres, y desarrollar y poner en práctica, en consonancia con el Marco de Sendai para la Reducción del Riesgo de Desastres 2015-2030, la gestión integral de los riesgos de desastre a todos los niveles.</li>
                                <li> Proporcionar apoyo a los países menos adelantados, incluso mediante asistencia financiera y técnica, para que puedan construir edificios sostenibles y resilientes utilizando materiales locales.</li>
                            </ol>
                        `;

                let contenedor = document.getElementById("contenedor");
                if (contenedor) {
                    contenedor.innerHTML = template_bar;
                } else {
                    console.error("Element with ID 'contenedor' not found.");
                }
            }
        });  
    });
});