const esES = {
    admin: {
        title: 'Seguimiento de sentadas',
        total: 'Total',
    },
    office_manager: {
        amount: 'Cantidad',
        total: 'Total',
    },
    sit_downs: {
        title: 'Sentadas',
        sit_down: 'Registro de sentadas simples',
        fail_credits: 'Creditos fallidos',
        simple_register: 'Tabla de registro de sentadas simples',
        empty: 'No hay sentadas',
    },
    detailed_sit_downs: {
        title: 'Sentadas detalladas',
        empty: 'No hay sentadas detalladas',
        register: {
            title: 'Agregar una sentada detallada',
            table: 'Tabla de sentadas detalladas agregadas',
            empty: 'No hay sentadas detalladas agregadas',
        },
        edit: {
            title: 'Editar una sentada detallada',
        },
    },
    auth: {
        login: {
            title: 'INGRESO',
            go_to_register: '¿No tienes una cuenta?'
        },
        register: {
            title: 'REGISTRO',
            go_to_login: '¿Ya estas registrado?'
        }
    },
    labels: {
        edit: 'Editar',
        first_name: 'Nombre',
        last_name: 'Apellido',
        email: 'Correo',
        office: 'Oficina',
        role: 'Rol',
        status: 'Estado',
        active: 'Activo',
        inactive: 'Inactivo',
        password: 'Contraseña',
        confirm_password: 'Confirmar contraseña',
        incomplete: 'Incompleto',
        processed: 'Procesado',
        fail_credit: 'Credito Fallido',
        sit_down: 'Sentada',
        fail_credits: 'Creditos Fallidos',
        sit_downs: 'Sentadas',
        payed: 'Pagado',
        date: 'Fecha',
        address: 'Direccion',
        phone_number: 'Numero de telefono',
        reason: 'Razon',
        closer: 'Cerrador',
        canvasser: 'Representante',
        name: 'Nombre',
        add: 'Agregar',
        user: 'Usuario',
        last_update: 'Ultima actualizacion'
    },
    loading: {
        text: 'Cargando...'
    },
    errors: {
        fields_required: 'Todos los campos deben ser completados',
        password_match: 'Las contraseñas deben coincidir',
        google_login: 'Fallo al ingresar con Google',
        page_not_found: 'No hay ninguna pagina aqui'
    },
    success: {
        title: 'Exito',
        amount_update: 'Cantidad actualizada exitosamente',
        sit_down_created: 'Sentada detallada creada',
        sit_down_udpated: 'Sentada detalla actualizada'
    },
    buttons: {
        save: 'Guardar',
        return: 'Volver',
        login: 'Ingresar',
        logout: 'Cerrar sesion',
        profile: 'Perfil',
        register: 'Registro'
    },
    filters: {
        search_placeholder: 'Buscar una sentada por nombre',
        search_title: 'Buscar por nombre',
        remove_filter: 'Quitar filtro',
    },
    users: {
        title: 'Usuarios',
        list: {
            empty: 'No hay usuarios'
        },
        edit: {
            title: 'Editar usuario',
        },
        roles: {
            admin: 'Admin',
            office_manager: 'Gerente de oficina'
        }
    },
    office: {
        select_office: 'Selecciona tu oficina'
    },
    profile: {
        title: 'Perfil',
        password: 'Contraseña',
        change_password: 'Cambiar contraseña',
        general: 'General'
    },
    select:{
        placeholder: 'Seleccionar...'
    }
};

export default esES;