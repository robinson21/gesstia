/**
 * GeSSTia - Datos Demo
 * Empresa ficticia: Constructora Los Andes Ltda.
 * Normativa: DS 44, DS 594, Ley 16.744, Ley 20.940
 */

const DATOS_DEMO = {
    
    // ============================================
    // EMPRESAS (Tenants)
    // ============================================
    empresas: [
        {
            id: "emp-001",
            nombre: "Constructora Los Andes Ltda.",
            rut: "76.123.456-7",
            giro: "Construcción de edificios",
            direccion: "Av. El Salto 1234, Santiago",
            tipo: "principal",
            creada: "2025-01-15",
            activa: true,
            contacto: {
                nombre: "Roberto Muñoz",
                cargo: "Gerente General",
                email: "r.munoz@losandes.cl",
                telefono: "+56 2 2345 6789"
            }
        },
        {
            id: "emp-002",
            nombre: "Seguridad y Protección Norte SPA",
            rut: "77.654.321-0",
            giro: "Servicios de seguridad privada",
            direccion: "Calle Los Pinos 456, Santiago",
            tipo: "contratista",
            vinculadaA: "emp-001",
            creada: "2025-03-10",
            activa: true
        },
        {
            id: "emp-003",
            nombre: "Limpieza Integral Sur Ltda.",
            rut: "78.901.234-5",
            giro: "Servicios de limpieza",
            direccion: "Av. Las Flores 789, Santiago",
            tipo: "contratista",
            vinculadaA: "emp-001",
            creada: "2025-04-05",
            activa: true
        }
    ],

    // ============================================
    // USUARIOS
    // ============================================
    usuarios: [
        {
            id: "usr-001",
            nombre: "Roberto Muñoz",
            email: "admin@losandes.cl",
            password: "Demo1234!",
            rol: "admin",
            empresaId: "emp-001",
            activo: true,
            ultimoLogin: null
        },
        {
            id: "usr-002",
            nombre: "Carmen Díaz",
            email: "supervisor@losandes.cl",
            password: "Demo1234!",
            rol: "supervisor",
            empresaId: "emp-001",
            activo: true
        },
        {
            id: "usr-003",
            nombre: "Juan Pérez",
            email: "colaborador@losandes.cl",
            password: "Demo1234!",
            rol: "colaborador",
            empresaId: "emp-001",
            activo: true
        }
    ],

    // ============================================
    // CENTROS DE TRABAJO
    // ============================================
    centrosTrabajo: [
        { id: "ct-001", nombre: "Oficina Central", empresaId: "emp-001", tipo: "administrativo" },
        { id: "ct-002", nombre: "Obra Edificio Aurora", empresaId: "emp-001", tipo: "construccion" },
        { id: "ct-003", nombre: "Obra Mall del Norte", empresaId: "emp-001", tipo: "construccion" },
        { id: "ct-004", nombre: "Bodega Maquinaria", empresaId: "emp-001", tipo: "almacen" }
    ],

    // ============================================
    // CARGOS CON IRL (Identificación Riesgos Laborales)
    // ============================================
    cargos: [
        {
            id: "c-001",
            nombre: "Albañil",
            nivelRiesgo: "alto",
            riesgos: [
                { tipo: "Caída en altura", descripcion: "Caída desde andamios o estructuras", nivel: "alto", factor: "Trabajo en altura > 2m" },
                { tipo: "Golpes y atrapamiento", descripcion: "Golpes por objetos, caída de herramientas", nivel: "alto", factor: "Manipulación de materiales" },
                { tipo: "Ruido", descripcion: "Exposición a ruido > 85 dB", nivel: "medio", factor: "Uso de martillos neumáticos" },
                { tipo: "Polvo respirable", descripcion: "Sílice cristalina", nivel: "medio", factor: "Corte de concreto" },
                { tipo: "Posturas forzadas", descripcion: "Manejo manual de cargas", nivel: "bajo", factor: "Levantamiento de bloques" }
            ]
        },
        {
            id: "c-002",
            nombre: "Capataz de Obra",
            nivelRiesgo: "alto",
            riesgos: [
                { tipo: "Caída en altura", descripcion: "Inspección de estructuras", nivel: "alto", factor: "Recorridos de inspección" },
                { tipo: "Stress laboral", descripcion: "Altas responsabilidades, presión", nivel: "medio", factor: "Coordinación de equipos" },
                { tipo: "Accidentes de tráfico", descripcion: "Traslado entre obras", nivel: "medio", factor: "Conducción frecuente" },
                { tipo: "Ruido", descripcion: "Exposición prolongada", nivel: "bajo", factor: "Obra en general" }
            ]
        },
        {
            id: "c-003",
            nombre: "Encargado de Bodega",
            nivelRiesgo: "medio",
            riesgos: [
                { tipo: "Caída de objetos", descripcion: "Estanterías, materiales almacenados", nivel: "alto", factor: "Almacenamiento vertical" },
                { tipo: "Maquinaria", descripcion: "Montacargas, transpaletas", nivel: "medio", factor: "Operación de equipos" },
                { tipo: "Polvo", descripcion: "Material particulado", nivel: "bajo", factor: "Manipulación cemento" }
            ]
        },
        {
            id: "c-004",
            nombre: "Operador de Maquinaria Pesada",
            nivelRiesgo: "alto",
            riesgos: [
                { tipo: "Vuelco de maquinaria", descripcion: "Tractores, excavadoras", nivel: "critico", factor: "Terrenos irregulares" },
                { tipo: "Atrapamiento", descripcion: "Entre partes móviles", nivel: "alto", factor: "Operación de equipos" },
                { tipo: "Vibración", descripcion: "Mano-brazo, cuerpo completo", nivel: "medio", factor: "Exposición prolongada" },
                { tipo: "Ruido", descripcion: "Exposición > 100dB", nivel: "medio", factor: "Maquinaria pesada" }
            ]
        },
        {
            id: "c-005",
            nombre: "Oficinista / Administrativo",
            nivelRiesgo: "bajo",
            riesgos: [
                { tipo: "Dolores musculares", descripcion: "Trabajo sedentario, posturas", nivel: "bajo", factor: "Uso de computador" },
                { tipo: "Estrés visual", descripcion: "Pantallas, iluminación", nivel: "bajo", factor: "Uso prolongado PC" },
                { tipo: "Ergonomía", descripcion: "Mobiliario inadecuado", nivel: "bajo", factor: "Silla/mesa" }
            ]
        },
        {
            id: "c-006",
            nombre: "Eléctrico",
            nivelRiesgo: "alto",
            riesgos: [
                { tipo: "Electrocución", descripcion: "Contacto con conductores energizados", nivel: "critico", factor: "Trabajo con alta tensión" },
                { tipo: "Arco eléctrico", descripcion: "Explosión por cortocircuito", nivel: "critico", factor: "Manipulación de tableros" },
                { tipo: "Caída de altura", descripcion: "Instalaciones en altura", nivel: "alto", factor: "Postes, estructuras" }
            ]
        },
        {
            id: "c-007",
            nombre: "Soldador",
            nivelRiesgo: "alto",
            riesgos: [
                { tipo: "Radiación UV", descripcion: "Quemaduras oculares, piel", nivel: "alto", factor: "Luz de arco" },
                { tipo: "Fuego", descripcion: "Chispas, material ignitable", nivel: "alto", factor: "Trabajo con fuego" },
                { tipo: "Gases", descripcion: "Humedal, ozono", nivel: "medio", factor: "Fumigación" },
                { tipo: "Ruido", descripcion: "Impactos, martilleo", nivel: "medio", factor: "Zona de trabajo" }
            ]
        },
        {
            id: "c-008",
            nombre: "Ayudante de Construcción",
            nivelRiesgo: "medio",
            riesgos: [
                { tipo: "Golpes", descripcion: "Herramientas, materiales", nivel: "medio", factor: "Apoyo en tareas diversas" },
                { tipo: "Caídas", descripcion: "Superficies irregulares", nivel: "medio", factor: "Terreno obra" },
                { tipo: "Polvo", descripción: "Material particulado", nivel: "bajo", factor: "Exposición ambiental" }
            ]
        }
    ],

    // ============================================
    // TRABAJADORES DEMO
    // ============================================
    trabajadores: [
        {
            id: "t-001",
            rut: "15.234.567-8",
            nombre: "Juan Carlos",
            apellido: "Martínez López",
            cargo: "Albañil",
            cargoId: "c-001",
            centroTrabajo: "Obra Edificio Aurora",
            centroTrabajoId: "ct-002",
            empresaId: "emp-001",
            telefono: "+56 9 1234 5678",
            email: "j.martinez@empleado.cl",
            fechaIngreso: "2024-03-15",
            fechaNacimiento: "1985-07-20",
            prevision: "fonasa",
            alergias: "Ninguna conocida",
            contactoEmergencia: { nombre: "María Martínez (esposa)", telefono: "+56 9 8765 4321" },
            activo: true
        },
        {
            id: "t-002",
            rut: "16.345.678-9",
            nombre: "Pedro Antonio",
            apellido: "Soto Morales",
            cargo: "Capataz de Obra",
            cargoId: "c-002",
            centroTrabajo: "Obra Edificio Aurora",
            centroTrabajoId: "ct-002",
            empresaId: "emp-001",
            telefono: "+56 9 2345 6789",
            email: "p.soto@empleado.cl",
            fechaIngreso: "2023-01-10",
            fechaNacimiento: "1978-04-12",
            prevision: "isapre",
            alergias: "Penicilina",
            contactoEmergencia: { nombre: "Paula Soto (hija)", telefono: "+56 9 3456 7890" },
            activo: true
        },
        {
            id: "t-003",
            rut: "18.456.789-0",
            nombre: "Carlos Andrés",
            apellido: "Fernández Silva",
            cargo: "Operador de Maquinaria Pesada",
            cargoId: "c-004",
            centroTrabajo: "Obra Mall del Norte",
            centroTrabajoId: "ct-003",
            empresaId: "emp-001",
            telefono: "+56 9 3456 7890",
            email: "c.fernandez@empleado.cl",
            fechaIngreso: "2024-06-01",
            fechaNacimiento: "1990-11-05",
            prevision: "fonasa",
            alergias: "Polen",
            contactoEmergencia: { nombre: "Laura Fernández (esposa)", telefono: "+56 9 4567 8901" },
            activo: true
        },
        {
            id: "t-004",
            rut: "20.567.890-1",
            nombre: "Patricia Elena",
            apellido: "González Ruiz",
            cargo: "Oficinista / Administrativo",
            cargoId: "c-005",
            centroTrabajo: "Oficina Central",
            centroTrabajoId: "ct-001",
            empresaId: "emp-001",
            telefono: "+56 9 4567 8901",
            email: "p.gonzalez@empleado.cl",
            fechaIngreso: "2023-08-20",
            fechaNacimiento: "1992-03-15",
            prevision: "isapre",
            alergias: "Ninguna",
            contactoEmergencia: { nombre: "Diego González (padre)", telefono: "+56 9 5678 9012" },
            activo: true
        },
        {
            id: "t-005",
            rut: "19.678.901-2",
            nombre: "Luis Alberto",
            apellido: "Ramírez Contreras",
            cargo: "Eléctrico",
            cargoId: "c-006",
            centroTrabajo: "Obra Edificio Aurora",
            centroTrabajoId: "ct-002",
            empresaId: "emp-001",
            telefono: "+56 9 5678 9012",
            email: "l.ramirez@empleado.cl",
            fechaIngreso: "2024-01-15",
            fechaNacimiento: "1988-09-22",
            prevision: "fonasa",
            alergias: "Ninguna conocida",
            contactoEmergencia: { nombre: "Ana Ramírez (esposa)", telefono: "+56 9 6789 0123" },
            activo: true
        },
        {
            id: "t-006",
            rut: "21.789.012-3",
            nombre: "Miguel Ángel",
            apellido: "Castro Vargas",
            cargo: "Soldador",
            cargoId: "c-007",
            centroTrabajo: "Bodega Maquinaria",
            centroTrabajoId: "ct-004",
            empresaId: "emp-001",
            telefono: "+56 9 6789 0123",
            email: "m.castro@empleado.cl",
            fechaIngreso: "2023-11-30",
            fechaNacimiento: "1983-06-18",
            prevision: "isapre",
            alergias: "Asma leve",
            contactoEmergencia: { nombre: "Rosa Castro (esposa)", telefono: "+56 9 7890 1234" },
            activo: true
        }
    ],

    // ============================================
    // MATRIZ IPER GENERAL
    // ============================================
    iper: {
        id: "iper-001",
        fechaCreacion: "2025-01-20",
        fechaActualizacion: "2025-05-15",
        creador: "usr-001",
        empresaId: "emp-001",
        
        riesgos: [
            {
                id: "r-001",
                peligro: "Caída en altura",
                riesgo: "Fracturas graves, incapacidad permanente",
                probabilidad: 3, // 1-5
                consecuencia: 5, // 1-5
                nivel: "critico",
                control: "Arnés con línea de vida, andamios certificados, supervisor",
                controlSugerido: "sistema de anclaje certificado y guardarraílas",
                frecuencia: "Diaria",
                legal: "DS 594 Art. 25, Ley 16744"
            },
            {
                id: "r-002",
                peligro: "Electrocución",
                riesgo: "Muerte, quemaduras severas",
                probabilidad: 2,
                consecuencia: 5,
                nivel: "critico",
                control: "Bloqueo y etiquetado, permisos de trabajo, EPPE",
                controlSugerido: "auditoría eléctrica trimestral y certificación de instalaciones",
                frecuencia: "Semanal",
                legal: "DS 594 Art. 37"
            },
            {
                id: "r-003",
                peligro: "Vuelco maquinaria",
                riesgo: "Aplastamiento, fatalidad",
                probabilidad: 2,
                consecuencia: 5,
                nivel: "critico",
                control: "Operador certificado, revisión técnica, uso de cinturón",
                controlSugerido: "sistema de monitoreo GPS y control de estabilidad",
                frecuencia: "Diaria",
                legal: "DS 594 Art. 42"
            },
            {
                id: "r-004",
                peligro: "Golpes y atrapamiento",
                riesgo: "Fracturas, amputaciones",
                probabilidad: 4,
                consecuencia: 4,
                nivel: "alto",
                control: "EPI completo, señalización, delimitación de áreas",
                controlSugerido: "sistema de sensores de proximidad en maquinaria",
                frecuencia: "Diaria",
                legal: "DS 594 Art. 20"
            },
            {
                id: "r-005",
                peligro: "Ruido > 85dB",
                riesgo: "Hipoacusia profesional",
                probabilidad: 5,
                consecuencia: 3,
                nivel: "alto",
                control: "Protectores auditivos, cabinas insonorizadas, monitoreo",
                controlSugerido: "programa de conservación auditiva anual con audios y seguimiento",
                frecuencia: "Diaria",
                legal: "DS 594 Art. 33"
            },
            {
                id: "r-006",
                peligro: "Polvo respirable (sílice)",
                riesgo: "Silicosis, cáncer pulmonar",
                probabilidad: 4,
                consecuencia: 4,
                nivel: "alto",
                control: "Mascarilla P100, sistema de vacío, ventilación local",
                controlSugerido: "muestreo ambiental trimestral y rotación de personal",
                frecuencia: "Diaria",
                legal: "DS 594 Art. 44"
            },
            {
                id: "r-007",
                peligro: "Posturas forzadas / manipulación manual",
                riesgo: "Lumbalgia, trastornos musculoesqueléticos",
                probabilidad: 5,
                consecuencia: 2,
                nivel: "medio",
                control: "Capacitación en levantamiento, descansos, ergonomía",
                controlSugerido: "rotación de tareas y ayudas mecánicas",
                frecuencia: "Diaria",
                legal: "DS 594 Art. 15"
            },
            {
                id: "r-008",
                peligro: "Stress laboral",
                riesgo: "Burnout, deterioro de salud mental",
                probabilidad: 3,
                consecuencia: 3,
                nivel: "medio",
                control: "Capacitación en manejo del estrés, línea de apoyo",
                controlSugerido: "programa de bienestar organizacional y flexibilidad laboral",
                frecuencia: "Continuo",
                legal: "DS 44, Ley 20.940"
            }
        ]
    },

    // ============================================
    // CAPACITACIONES
    // ============================================
    capacitaciones: [
        {
            id: "cap-001",
            titulo: "Uso Correcto de EPP",
            descripcion: "Identificación, selección y uso de equipos de protección personal en construcción.",
            tipo: "transversal",
            duracion: 45, // minutos
            asistentes: 28,
            calificacion: 4.7,
            creadaIA: false,
            activa: true,
            requiereEvaluacion: true,
            preguntas: [
                { pregunta: "¿Cuándo usar casco de seguridad?", opciones: ["Siempre en obra", "Solo en altura", "Cuando quiera"], correcta: 0 },
                { pregunta: "Elarnés debe tener:", opciones: ["Solo cinturón", "Cinturón + tirantes + conectores", "Solo conectores"], correcta: 1 }
            ]
        },
        {
            id: "cap-002",
            titulo: "Trabajo en Altura Seguro",
            descripcion: "Protocolos de seguridad para trabajos en altura según Decreto 594.",
            tipo: "especifica",
            duracion: 60,
            asistentes: 15,
            calificacion: 4.5,
            creadaIA: false,
            activa: true,
            requiereEvaluacion: true
        },
        {
            id: "cap-003",
            titulo: "Manejo Defensivo de Maquinaria",
            descripcion: "Operación segura de excavadoras, tractores y montacargas.",
            tipo: "especifica",
            duracion: 90,
            asistentes: 8,
            calificacion: 4.8,
            creadaIA: false,
            activa: true,
            requiereEvaluacion: true
        },
        {
            id: "cap-004",
            titulo: "Primera Respuesta ante Emergencias",
            descripcion: "RCP básico, uso de extintores, evacuación.",
            tipo: "transversal",
            duracion: 120,
            asistentes: 45,
            calificacion: 4.9,
            creadaIA: false,
            activa: true,
            requiereEvaluacion: true
        },
        {
            id: "cap-005",
            titulo: "Ergonomía en Oficina",
            descripcion: "Postura, pausas activas, acondicionamiento del espacio de trabajo.",
            tipo: "transversal",
            duracion: 30,
            asistentes: 12,
            calificacion: 4.3,
            creadaIA: true,
            activa: true,
            requiereEvaluacion: false
        },
        {
            id: "cap-006",
            titulo: "Identificación de Riesgos Eléctricos",
            descripcion: "Protocolos LOCK-OUT TAG-OUT, trabajo con energía.",
            tipo: "especifica",
            duracion: 75,
            asistentes: 6,
            calificacion: 4.6,
            creadaIA: true,
            activa: true,
            requiereEvaluacion: true
        }
    ],

    // ============================================
    // PROCEDIMIENTOS (para derivar capacitaciones)
    // ============================================
    procedimientos: [
        {
            id: "proc-001",
            nombre: "Procedimiento de Trabajo en Altura",
            version: "2.0",
            fecha: "2024-12-01",
            tipo: "operativo",
            creador: "usr-001",
            archivo: "proc_altura_v2.pdf",
            derivados: ["cap-002"], // Capacitaciones generadas
            estado: "vigente"
        },
        {
            id: "proc-002",
            nombre: "Procedimiento de Bloqueo y Etiquetado (LOTO)",
            version: "1.5",
            fecha: "2024-11-15",
            tipo: "operativo",
            creador: "usr-001",
            archivo: "proc_loto_v1.5.pdf",
            derivados: ["cap-006"],
            estado: "vigente"
        }
    ],

    // ============================================
    // CONTRATISTAS
    // ============================================
    contratistas: [
        {
            id: "cont-001",
            nombre: "Seguridad y Protección Norte SPA",
            rut: "77.654.321-0",
            empresaId: "emp-002",
            tipoContrato: "Servicios de vigilancia",
            fechaInicio: "2024-01-01",
            fechaTermino: "2024-12-31",
            cumplimiento: 85,
            cumpleNormativa: true,
            activo: true
        },
        {
            id: "cont-002",
            nombre: "Limpieza Integral Sur Ltda.",
            rut: "78.901.234-5",
            empresaId: "emp-003",
            tipoContrato: "Mantenimiento de instalaciones",
            fechaInicio: "2024-03-01",
            fechaTermino: "2025-02-28",
            cumplimiento: 72,
            cumpleNormativa: false,
            observaciones: "Pendiente entrega de certificados médicos",
            activo: true
        }
    ],

    // ============================================
    // FIRMAS DIGITALES
    // ============================================
    firmas: [
        {
            id: "fir-001",
            documento: "cap-002",
            tipoDocumento: "capacitacion",
            firmante: "t-001",
            fechaFirma: "2025-02-10",
            hashDocumento: "a1b2c3d4e5f6...",
            certificado: true,
            valida: true
        },
        {
            id: "fir-002",
            documento: "iper-001",
            tipoDocumento: "matriz-iper",
            firmante: "usr-001",
            fechaFirma: "2025-01-25",
            hashDocumento: "g7h8i9j0k1l2...",
            certificado: true,
            valida: true
        }
    ]
};

// Hacer datos disponibles globalmente
window.DATOS_DEMO = DATOS_DEMO;
