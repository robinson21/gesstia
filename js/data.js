/**
 * GeSSTia - Datos Demo Globales
 * Compartidos entre todos los módulos
 */

const DATOS_DEMO = {
    
    // Usuarios de prueba
    usuarios: [
        {
            id: "usr-001",
            nombre: "Roberto Muñoz",
            email: "admin@losandes.cl",
            password: "Demo1234!",
            rol: "admin",
            empresaId: "emp-001",
            activo: true
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

    // Empresas
    empresas: [
        {
            id: "emp-001",
            nombre: "Constructora Los Andes Ltda.",
            rut: "76.123.456-7",
            giro: "Construcción de edificios",
            direccion: "Av. El Salto 1234, Santiago",
            tipo: "principal",
            contacto: {
                nombre: "Roberto Muñoz",
                cargo: "Gerente General",
                email: "r.munoz@losandes.cl",
                telefono: "+56 2 2345 6789"
            }
        }
    ],

    // Trabajadores
    trabajadores: [
        {
            id: "t-001",
            rut: "15.234.567-8",
            nombre: "Juan Carlos",
            apellido: "Martínez López",
            cargo: "Albañil",
            centroTrabajo: "Obra Edificio Aurora",
            empresaId: "emp-001",
            telefono: "+56 9 1234 5678",
            email: "j.martinez@empleado.cl",
            fechaIngreso: "2024-03-15",
            prevision: "fonasa",
            alergias: "Ninguna conocida",
            activo: true
        },
        {
            id: "t-002",
            rut: "16.345.678-9",
            nombre: "Pedro Antonio",
            apellido: "Soto Morales",
            cargo: "Capataz de Obra",
            centroTrabajo: "Obra Edificio Aurora",
            empresaId: "emp-001",
            telefono: "+56 9 2345 6789",
            email: "p.soto@empleado.cl",
            fechaIngreso: "2023-01-10",
            prevision: "isapre",
            alergias: "Penicilina",
            activo: true
        },
        {
            id: "t-003",
            rut: "18.456.789-0",
            nombre: "Carlos Andrés",
            apellido: "Fernández Silva",
            cargo: "Operador de Maquinaria Pesada",
            centroTrabajo: "Obra Mall del Norte",
            empresaId: "emp-001",
            telefono: "+56 9 3456 7890",
            email: "c.fernandez@empleado.cl",
            fechaIngreso: "2024-06-01",
            prevision: "fonasa",
            alergias: "Polen",
            activo: true
        },
        {
            id: "t-004",
            rut: "20.567.890-1",
            nombre: "Patricia Elena",
            apellido: "González Ruiz",
            cargo: "Oficinista / Administrativo",
            centroTrabajo: "Oficina Central",
            empresaId: "emp-001",
            telefono: "+56 9 4567 8901",
            email: "p.gonzalez@empleado.cl",
            fechaIngreso: "2023-08-20",
            prevision: "isapre",
            alergias: "Ninguna",
            activo: true
        },
        {
            id: "t-005",
            rut: "19.678.901-2",
            nombre: "Luis Alberto",
            apellido: "Ramírez Contreras",
            cargo: "Eléctrico",
            centroTrabajo: "Obra Edificio Aurora",
            empresaId: "emp-001",
            telefono: "+56 9 5678 9012",
            email: "l.ramirez@empleado.cl",
            fechaIngreso: "2024-01-15",
            prevision: "fonasa",
            alergias: "Ninguna conocida",
            activo: true
        },
        {
            id: "t-006",
            rut: "21.789.012-3",
            nombre: "Miguel Ángel",
            apellido: "Castro Vargas",
            cargo: "Soldador",
            centroTrabajo: "Bodega Maquinaria",
            empresaId: "emp-001",
            telefono: "+56 9 6789 0123",
            email: "m.castro@empleado.cl",
            fechaIngreso: "2023-11-30",
            prevision: "isapre",
            alergias: "Asma leve",
            activo: true
        }
    ],

    // Matriz IPER
    iper: {
        riesgos: [
            {
                id: "r-001",
                peligro: "Caída en altura",
                riesgo: "Fracturas graves, incapacidad permanente",
                probabilidad: 3,
                consecuencia: 5,
                nivel: "critico",
                control: "Arnés con línea de vida, andamios certificados, supervisor",
                legal: "DS 594 Art. 25"
            },
            {
                id: "r-002",
                peligro: "Electrocución",
                riesgo: "Muerte, quemaduras severas",
                probabilidad: 2,
                consecuencia: 5,
                nivel: "critico",
                control: "Bloqueo y etiquetado, permisos de trabajo, EPPE",
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
                legal: "DS 594 Art. 44"
            },
            {
                id: "r-007",
                peligro: "Posturas forzadas",
                riesgo: "Lumbalgia, trastornos musculoesqueléticos",
                probabilidad: 5,
                consecuencia: 2,
                nivel: "medio",
                control: "Capacitación en levantamiento, descansos, ergonomía",
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
                legal: "DS 44"
            }
        ]
    },

    // Capacitaciones
    capacitaciones: [
        {
            id: "cap-001",
            titulo: "Uso Correcto de EPP",
            descripcion: "Identificación, selección y uso de equipos de protección personal en construcción",
            tipo: "transversal",
            duracion: 45,
            asistentes: 28,
            calificacion: 4.7,
            activa: true
        },
        {
            id: "cap-002",
            titulo: "Trabajo en Altura Seguro",
            descripcion: "Protocolos de seguridad para trabajos en altura según Decreto 594",
            tipo: "especifica",
            duracion: 60,
            asistentes: 15,
            calificacion: 4.5,
            activa: true
        },
        {
            id: "cap-003",
            titulo: "Manejo Defensivo de Maquinaria",
            descripcion: "Operación segura de excavadoras, tractores y montacargas",
            tipo: "especifica",
            duracion: 90,
            asistentes: 8,
            calificacion: 4.8,
            activa: true
        },
        {
            id: "cap-004",
            titulo: "Primera Respuesta ante Emergencias",
            descripcion: "RCP básico, uso de extintores, evacuación",
            tipo: "transversal",
            duracion: 120,
            asistentes: 45,
            calificacion: 4.9,
            activa: true
        },
        {
            id: "cap-005",
            titulo: "Ergonomía en Oficina",
            descripcion: "Postura, pausas activas, acondicionamiento del espacio de trabajo",
            tipo: "transversal",
            duracion: 30,
            asistentes: 12,
            calificacion: 4.3,
            activa: true
        },
        {
            id: "cap-006",
            titulo: "Identificación de Riesgos Eléctricos",
            descripcion: "Protocolos LOCK-OUT TAG-OUT, trabajo con energía",
            tipo: "especifica",
            duracion: 75,
            asistentes: 6,
            calificacion: 4.6,
            activa: true
        }
    ],

    // Contratistas
    contratistas: [
        {
            id: "cont-001",
            nombre: "Seguridad y Protección Norte SPA",
            rut: "77.654.321-0",
            tipoContrato: "Servicios de vigilancia",
            cumplimiento: 85,
            cumpleNormativa: true,
            activo: true
        },
        {
            id: "cont-002",
            nombre: "Limpieza Integral Sur Ltda.",
            rut: "78.901.234-5",
            tipoContrato: "Mantenimiento de instalaciones",
            cumplimiento: 72,
            cumpleNormativa: false,
            observaciones: "Pendiente entrega de certificados médicos",
            activo: true
        }
    ],

    // Firmas
    firmas: [
        {
            id: "fir-001",
            documento: "cap-002",
            firmante: "t-001",
            fechaFirma: "2025-02-10",
            valida: true
        }
    ],

    // Tareas pendientes
    tareas: [
        { id: 1, titulo: "Revisar EPP trabajadores obra Edificio Aurora", prioridad: "alta", fecha: "2026-05-20" },
        { id: 2, titulo: "Capacitación obligatoria trabajo en altura", prioridad: "alta", fecha: "2026-05-22" },
        { id: 3, titulo: "Auditar contratista Limpieza Sur Ltda.", prioridad: "media", fecha: "2026-05-25" },
        { id: 4, titulo: "Actualizar Matriz IPER trimestral", prioridad: "media", fecha: "2026-05-28" },
        { id: 5, titulo: "Revisar certificados médicos soldadores", prioridad: "baja", fecha: "2026-06-01" }
    ]
};

// Funciones helper globales
window.DATOS_DEMO = DATOS_DEMO;
