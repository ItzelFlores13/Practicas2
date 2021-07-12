import { UserSearchParams } from 'src/app/providers/UserProvider';
import { id } from '@swimlane/ngx-charts';

export const ROUTES = {
  authentication: 'api/auth/login',
  asistencias: {
    show: `api/asistencia/por-sesion`,
    update: `api/asistencia/update`,
    delete: (idAsistencia) => { return `api/asistencia/destroy/${idAsistencia}` },
    store: `api/asistencia/store-admin`
  },
  clases: {
    index: 'api/clase',
    indexSinPaginar: 'api/clase/index-sin-paginar',
    store: 'api/clase/store',
    update: 'api/clase/update',
    destroy: (claseId) => { return `api/clase/destroy/${claseId}` },
    show: (claseId) => { return `api/clase/${claseId}` },
    index_sin_paginar: 'api/clase/index-sin-paginar'

  },
  dashboard:{
    stats: (idGym) => { return `api/gimnasio/${idGym}/estadisticas` },
    usersExpired: (idGym) => { return `api/gimnasio/${idGym}/usuarios-vencidos` },
    usersExpiredRange:  `api/dashboard/usuarios-en-rango-vencimiento/limit`,
    recordatorio: (idGym,idUsuario) => { return `api/gimnasio/${idGym}/recordatorio/${idUsuario}` },
    recordatorioNotificacion: (idUsuario) => { return `api/notifications/recordar-pago/${idUsuario}` },
    usersActiveStats: (idGym) => { return `api/gimnasio/${idGym}/usuarios-activos-mes` },
    salesMonth: (idGym) => { return `api/gimnasio/${idGym}/ingresos-venta-mes` },
    salesTotalMonth: (idGym) => { return `api/gimnasio/${idGym}/ingresos-totales-mes` },
    attendanceByPeriod: (idGym) => { return `api/gimnasio/${idGym}/asistencia-periodo` },
    membershipsByMonth: (idGym) => { return `api/gimnasio/${idGym}/ingresos-membresia-mes` },
    productosTop: (idGym) => { return `api/gimnasio/${idGym}/productos-top` },
    membershipsTop: (idGym) => { return `api/gimnasio/${idGym}/membresias-mas-vendidas` },
    usersBirthday: `api/dashboard/usuarios-cumpleanieros`,
    dailyEgressReport: (idGym) => { return `api/reportes/${idGym}/corte-caja`},
    dailyMembershipsReport: (idGym) => { return `/api/reportes/${idGym}/corte-caja`},
    attendanceClassCoach: (idGym) => { return `/api/gimnasio/${idGym}/asistencia-clases-profesores`},
    attendanceClass: (idGym) => { return `/api/gimnasio/${idGym}/asistencias-por-clases`},
    attendanceHours: (idGym) => { return `/api/gimnasio/${idGym}/asistencias-por-horas`}
  },
  egreso:{
    index: (idGym) => { return `api/gimnasio/${idGym}/egreso` },
    store: (idGym) => { return `api/gimnasio/${idGym}/egreso/store` },
    update: (idGym,idEg) => { return `api/gimnasio/${idGym}/egreso/update/${idEg}` },
    detele: (idGym,idEg) => { return `api/gimnasio/${idGym}/egreso/destroy/${idEg}` },
    show: (idGym,idEg) => { return `api/gimnasio/${idGym}/egreso/${idEg}` },
    egressByMonth: (idGym) => { return `api/gimnasio/${idGym}/egresos-por-mes` },
  },
  categoriaEgreso:{
    indexSinPaginar: (idGym,idSucursal) => { return `api/categoria-egreso/${idGym}/${idSucursal}/sin-paginar` },
    store: `api/categoria-egreso/store`
  },
  entrenamiento:{
    selectWod: `api/gimnasio/6/wod/filtro-panel`
  },
  profile: {
    show: 'api/gimnasio',
  },
  articulos: {
    index: `api/articulo/buscar-panel`,
    store: `api/articulo/store`,
    show: (artId) => { return `api/articulo/${artId}` },
    update: `api/articulo/update`,
    destroy: (artId) => { return `api/articulo/destroy/${artId}` }
  },
  categorias: {
    index: `api/categoria/buscar`,
    store: `api/categoria/store`,
    update: `api/categoria/update`,
    destroy: (catId) => { return `api/categoria/destroy/${catId}` }
  },
  dispersionContact: {
    show: (gymID) => {
      return `api/gimnasio/${gymID}/contactodispersion/show/${gymID}`;
    },
    create: (gymID) => {
      return `api/gimnasio/${gymID}/contactodispersion/store`;
    },
    update: (gymID) => {
      return `api/gimnasio/${gymID}/contactodispersion/update`;
    }
  },
  emails:{
    index:`api/emails`,
    store: 'api/emails/store',
    show: (idEmail) => { return `api/emails/${idEmail}` },
    update: (idEmail) => { return `api/emails/update/${idEmail}` },
    destroy: (idEmail) => { return `api/emails/destroy/${idEmail}` },
    resend: (idEmail) => { return `api/emails/resend/${idEmail}` },
  },
  emails_groups:{
    index:`api/emails-groups`,
    store:`api/emails-groups/store`,
    show: (idGroup) => { return `api/emails-groups/${idGroup}` },
    update: (idGroup) => { return `api/emails-groups/update/${idGroup}` },
    destroy: (idGroup) => { return `api/emails-groups/destroy/${idGroup}` }
    
  },
  entrenamientos: {
    store: (idGym) => { return `api/gimnasio/${idGym}/wod/store` },
    update: (idGym) => { return `api/gimnasio/${idGym}/wod/update` },
    show: (idGym, idWod) => { return `api/gimnasio/${idGym}/wod/${idWod}` },
    index: (idGym) => { return `api/gimnasio/${idGym}/wod/filtro-panel` },
    destroy: (idGym, idWod) => { return `api/gimnasio/${idGym}/wod/destroy/${idWod}` },
    selectWodByMonth: (idGym) => { return `api/gimnasio/${idGym}/wod/filtro-panel-by-month` },
    selectWodRondas: (idGym) => { return `api/gimnasio/${idGym}/wod/filtro-panel-con-rondas` },
    usersWods: (idGym, idWod) => { return `api/gimnasio/${idGym}/wod-get-atletas/${idWod}` }
  },
  grupos_entrenamientos: {
    index: `api/grupo/filtro`,
    store: `api/grupo/store`,
    update: `api/grupo/update`,
    destroy: (idGroup) => { return `api/grupo/destroy/${idGroup}` },
    show: (idGroup) => { return `api/grupo/${idGroup}` }
  },
  imagenes: {

  },
  rondas: {
    index: `api/tiporonda`,
    unidad: `api/unidad`,
  },
  membresias_group: {
    show: (id) => { return `api/tipomembresia/${id}` },
    update: 'api/tipomembresia/update',
    destroy: (id) => { return `api/tipomembresia/destroy/${id}` },
    create: 'api/tipomembresia/store',
    index: (sucID) => {
      return `api/tipomembresia/por-sucursal/${sucID}`;
    }
  },
  membresias: {
    create: 'api/membresia/store',
    update: 'api/membresia/update',
    destroy: (id) => { return `api/membresia/destroy/${id}`; },
    show: (id) => { return `api/membresia/${id}`; },
    index: (id_tipo) => { return `api/membresia/por-tipo-panel/${id_tipo}`; },
    inGroup: (idGroup) => { return `api/membresia/por-tipo-panel/${idGroup}` },
    search: 'api/membresia/buscar-membresia/sin-tipo',
    membershipGym: (idGym) => { return `api/membresia/by-gym/${idGym}`; },
  },
  sucursales: {
    show: (idSuc) => { return `api/sucursal/${idSuc}` },
    index_paginate: (gymID) => { return `api/sucursal/bygym/${gymID}` },
    create: `api/sucursal/store`,
    update: `api/sucursal/update`,
    destroy: (idSuc) => { return `api/sucursal/destroy/${idSuc}` },
    index: (gymID) => {
      return `api/sucursal/bygym/${gymID}`;
    }
  },
  horario: {
    index: 'api/clase/por-sucursal-fecha',
    indexByMonth: 'api/clase/por-sucursal-mes',
    dias: 'api/dia',
    create: 'api/sesion/store',
    show: (idSesion) => { return `api/sesion/${idSesion}` },
    update: 'api/sesion/update',
    delete: (idSesion) => { return `api/sesion/destroy/${idSesion}` }
  },
  gimnasio: {
    index: 'api/gimnasio/buscar',
    show: (idGym) => { return `api/gimnasio/${idGym}` },
    enviarRecordatorio: (gymID, userID) => { return `api/gimnasio/${gymID}/recordatorio/${userID}` },
    search: `api/gimnasio/buscar`,
    getAdmins: gymId => {
      return `api/gimnasio/get-admins/${gymId}`;
    },
    updateStatus: `api/gimnasio/update`,
    payments: (idGym) => {
      return `api/gimnasio/get-gym-payments/${idGym}`;
    },
    settingsUpdate: (gymID) => { return `api/gimnasio/${gymID}/settings/update` },
    settingsPageWebCreate: (gymID) => { return `api/gimnasio/${gymID}/settings-gym/create-setting` },
    settingsPageWebUpdate: (gymID) => { return `api/gimnasio/${gymID}/settings-gym/update-setting` },
    settingsPageWebUpdateHearderF: (gymID) => { return `api/gimnasio/${gymID}/settings-gym/save-header-first` },
    settingsPageWebUpdateHearderS: (gymID) => { return `api/gimnasio/${gymID}/settings-gym/save-header-second` },
    updatePhoto: 'api/gimnasio/update-photo',
    paises: 'api/paises',
    gymStore: 'api/gimnasio/store',
    gymUpdate: 'api/gimnasio/update',
  },
  contacto: {
    create: 'api/contacto/store',
    update: 'api/contacto/update'
  },
  direccion: {
    create: 'api/direccion/store',
    update: 'api/direccion/update'
  },
  usuarios: {
    create: 'api/user/store',
    update: 'api/user/update',
    destroy: (userID) => { return `api/user/destroy/${userID}` },
    destroyMass: 'api/user/destroy-masivo',
    search: 'api/user',
    searchCount: 'api/user/total/users',
    expirados: (gymID) => {
      return `api/usuariomembresia/gimnasio/${gymID}/expirados`;
    },
    activos: (gymID) => {
      return `api/usuariomembresia/gimnasio/${gymID}/activos`;
    },
    show: (IdUser) => { return `api/user/${IdUser}` },
    showEdit: (IdUser) => { return `api/user/show-user/${IdUser}` },
    byGym: 'api/user/byGym',
    byGymCount: 'api/user/byGym/total',
    activarUsuario: `api/user/activate-users`,
    desactivarUsuario: `api/user/deactivate-users`,
    historialCompras: `api/user/historial-compras-gym`,
    importarCSV: `api/gimnasio/null/usuarios/importar-excel`,
    entrenadores: (IdSuc) => { return `api/sucursal/admins-and-coaches/${IdSuc}` },
    checkEmail: (email) => { return `api/existe-email?email=${email}` },
    getUserbyEmail: `api/user/getUserByEmail`,
    sendNotification: `api/user/sendNotificationAthleteEmail`,
    updatePhoto: 'api/user/update-photo',
    setPassword: 'api/auth/set-password',
    recoveryPassword: 'api/user/solicitar-recovery',
    byMessages: 'api/user/by-message/search',
  },
  usuariomembresia: {
    index: 'api/usuariomembresia/listado-membresias',
    destroy: 'api/usuariomembresia/eliminar-membresia',
    updateDateStart: 'api/usuariomembresia/actualizarfechainicio',
    updateDateEnd: 'api/usuariomembresia/actualizarfechacorte'
  },
  reportes: {
    atletas: (id) => { return `api/reportes/atletas/${id}` }
  },
  openpay: {
    getCards: 'api/openpay/get-cards',
    getPlans: 'api/openpay/get-plans',
    saveCard: 'api/openpay/add-card',
    deleteCard: 'api/openpay/delete-card',
    setSubscription: 'api/openpay/set-subscription-cardId',
    getSubscription: 'api/openpay/get-subscription',
    setSubscriptionGym: 'api/openpay/set-subscription-gym',
    getSubscriptionInfoGym: 'api/openpay/get-subscription-info-gym',
    saveCardGym: 'api/openpay/add-card-gym',
    getCardByGym: 'api/openpay/get-card-gym',
    deleteSubscriptionGym: 'api/openpay/delete-subscription-gym',
    deleteCardGym: 'api/openpay/delete-card-gym',
    verifyPayment: 'api/openpay/verify-payment',
    updateCardGym: 'api/openpay/update-card',
  },
  notifications: {
    index: `api/notifications`,
    save: `api/notifications/store`,
    update: `api/notifications/update`,
    delete: `api/notifications/destroy`,
    resend: `api/notifications/resend-notification`,
  },
  exercises: {
    exerciseType: `api/tipoejercicio`,
    getExercises: (gymId) => {
      return `api/gimnasio/${gymId}/ejercicio`;
    },
    saveExercise: (gymId) => {
      return `api/gimnasio/${gymId}/ejercicio/store`;
    },
    addExerciseType: `api/gimnasio/ejercicio/agregar-tipo`,
    updateExercise: (gymId) => {
      return `api/gimnasio/${gymId}/ejercicio/update`;
    },
    addExcerciseImage: (gymId) => {
      return `api/gimnasio/${gymId}/ejercicio/agregar-imagen`;
    },
    deleteExcerciseImage: (gymId) => {
      return `api/gimnasio/${gymId}/ejercicio/eliminar-imagen`;
    },
    deleteExcercise: (gymId, exerciseId) => {
      return `api/gimnasio/${gymId}/ejercicio/${exerciseId}/destroy`;
    },
  },
  periodoClase: {
    create: `api/periodoclase/store`,
    update: `api/periodoclase/update`,
    delete: (idPeriodo) => { return `api/periodoclase/destroy/${idPeriodo}` }
  },
  s3: {
    GetPost: `api/get-direct-post-url`
  },
  shop: {
    create: `api/venta/venta-masiva`,
    getDetail: `api/venta`,
  },
  paypal: {
    setSubscription: `api/paypal/set-gym-subscription`,
    getSubscription: `api/paypal/get-gym-subscription`,
    cancelSubscription: `api/paypal/cancel-gym-subscription`,
    getSubscriptionTransaction: `api/paypal/get-subscription-transactions`,
  },
  gym: {
    index: (idSucursal) => {
      return `api/gyms/show_gym/${idSucursal}`;
    },
    list: (page) => {
      return `api/gimnasio?page=${page}`;
    },
    setFreeSubscription: `api/gimnasio/setFreeSubscription`,
    getFreeSubscription: (gymId) => {
      return `api/gimnasio/getFreeSubscription/${gymId}`;
    },
    deleteFreeSubscription: `api/gimnasio/cancelGymFreeSubscription`,
  },
  wodVideo: {
    index: (gymId) => {
      return `api/gimnasio/${gymId}/videos`;
    },
    delete: (data) => {
      return `api/gimnasio/${data.gymId}/videos/destroy/${data.id}`;
    },
    save: (gymId) => {
      return `api/gimnasio/${gymId}/videos/store`;
    },
    update: (gymId, id) => {
      return `api/gimnasio/${gymId}/videos/update/${id}`;
    }
  },
  metodoPago: {
    index: `api/metodopago`
  },
  reports: {
    caja: (gymId) => {
      return `api/reportes/${gymId}/corte-caja`;
    },
    membership: (gymId) => {
      return `api/reportes/${gymId}/reporte-pago-membresias`;
    },
    asistenciaMembresia: (gymId) => {
      return `api/reportes/${gymId}/reporte-asistencias`;
    },
    asistenciaSinMembresia: (gymId) => {
      return `api/reportes/${gymId}/getAsistenciaAnormal`;
    },
    egresos: (gymId) => {
      return `api/reportes/${gymId}/reporte-egresos`;
    },
    points: `api/atleta/puntos-ganados`,
    purchases: `/api/atleta/puntos-usados`,
    dailyReports: (gymId) => {
      return `api/reportes/${gymId}/daily-reports`;
    },
  },
  exports: {
    getCaja: (gymId) => {
      return `api/reportes/${gymId}/descargar-excel-reporte-caja`;
    },
    getMembership: (gymId) => {
      return `api/reportes/${gymId}/descargar-excel-reporte-pago-membresias`;
    },
    getAttendance: (gymId) => {
      return `/api/reportes/${gymId}/descargar-excel-reporte-asistencias`;
    },
    getAttendanceNoMemberships: (gymId) => {
      return `/api/reportes/${gymId}/descargar-excel-reporte-asistencias-no-membresias`;
    },
    getEgresos: (gymId) => {
      return `/api/reportes/${gymId}/descargar-excel-reporte-egresos`;
    },
    getPuntosObtenidos: `/api/reportes/atletas/puntos/obtenidos`,
    getPuntosCompras: `/api/reportes/atletas/puntos/compras`,
  },
  muro: {
    getPosts: (page) => { return `/api/columns?page=${page}` },
    getPost: (id) => { return `api/columns/tags/${id}` }, //metod not allowed
    deletePost: (id) => { return `/api/columns/destroy/${id}` },
    savePost: `/api/columns/store`,
    updatePost: `api/columns/update`,
    deleteTema: (id) => { return `/api/tema-muro/destroy/${id}` },
    updateTema: (id) => { return `/api/tema-muro/update/${id}` },
    saveTema: `api/tema-muro/store`,
    getTemasCategoria: (page) => { return `/api/tema-muro?page=${page}` },
    getTemasSinPaginar: `api/tema-muro/sin-paginar`

  },
  pedidos: {
    pendings: `api/pedidos/listar-pendientes`,
    historical: `api/pedidos/listar-entregados`,
  },
  divisas: {
    index: 'api/pais',
    save: 'api/pais/store',
    update: (id) => {
      return `api/pais/update/${id}`;
    },
  },
};

Object.freeze(ROUTES);