document.querySelectorAll('input, textarea, select').forEach(function(el) {
    el.setAttribute('autocomplete', 'off');
});

const langData = {
   ru: {
    appTitle: 'Focus ',
    notificationsTitle: 'Уведомления',
    markAllReadBtn: 'Прочитать всё',
    deleteAllNotifBtn: 'Очистить всё',
    searchPlaceholder: 'Поиск задач...',
    filterProjectLabel: 'Проект',
    filterTagLabel: 'Тег',
    filterDateLabel: 'Дата',
    filterStatusLabel: 'Статус',
    filterPriorityLabel: 'Приоритет',
    applyFilterBtn: 'Применить',
    clearFilterBtn: 'Сбросить',
    settingsMenu: 'Настройки',
    logoutMenu: 'Выйти',
    projectsMenu: 'Проекты',
    create: 'Создать',
    save: 'Сохранить',
    update: 'Обновить',
    cancel: 'Отмена',
    taskSubmitBtn: 'Создать задачу',
    taskUpdateBtn: 'Обновить задачу',
    inviteByEmailPlaceholder: 'Введите email или имя пользователя',
    searchUserBtn: 'Найти',
    inviteMemberBtn: 'Пригласить',
    noUserFound: 'Пользователь не найден',
    enterTeamNamePlaceholder: 'Введите название команды',
    teamDescriptionPlaceholder: 'Описание команды (необязательно)',
    quickTeamTitle: 'Создание команды',
    quickTeamNameLabel: 'Название команды',
    quickTeamDescLabel: 'Описание (необязательно)',
    quickTeamCancelBtn: 'Отмена',
    quickTeamSubmitBtn: 'Создать команду и проект',
    teamMembersTitle: 'Участники команды',
    membersLabel: 'Участники',
    invitedLabel: 'Приглашённые',
    inviteByEmailLabel: 'Пригласить участника',
    teamProjectsLabel: 'Проекты команды',
    addProjectBtn: 'Добавить',
    quickCategoryTitle: 'Новая категория',
    quickCategorySubmitBtn: 'Создать',
    quickTagTitle: 'Новый тег',
    quickTagSubmitBtn: 'Создать',
    createInlineBtn: '+',
    teamsMenu: 'Мои команды',
    allTasksMenu: 'Все задачи',
    clientsMenu: 'Клиенты',
    statisticsMenu: 'Статистика',
    reportsMenu: 'Отчёты',
    mon: 'Пн', tue: 'Вт', wed: 'Ср', thu: 'Чт', fri: 'Пт', sat: 'Сб', sun: 'Вс',
    lowPriority: 'Низкий',
    mediumPriority: 'Средний', 
    highPriority: 'Высокий',
    inviteByEmailLabel: 'Пригласить по email',
    closeMembersBtn: 'Закрыть',
    newTeam: 'Новая команда',
    projectModalTitle: 'Новый проект',
    projectNameLabel: 'Название',
    projectNamePlaceholder: 'Введите название проекта',
    projectDescLabel: 'Описание',
    projectDescPlaceholder: 'Краткое описание',
    projectTypeLabel: 'Тип',
    projectTypePersonal: 'Личный',
    projectTypeTeam: 'Командный',
    projectCancelBtn: 'Отмена',
    projectSubmitBtn: 'Создать проект',
    taskAssigneeLabel: 'Исполнитель',
    taskModalTitle: 'Новая задача',
    taskTitleLabel: 'Название',
    taskTitlePlaceholder: 'Введите название задачи',
    taskDescLabel: 'Описание',
    taskDescPlaceholder: 'Подробное описание',
    taskDueLabel: 'Срок',
    taskTimeLabel: 'Время',
    taskPriorityLabel: 'Приоритет',
    taskProjectLabel: 'Проект',
    taskTagLabel: 'Тег',
    taskCancelBtn: 'Отмена',
    taskSubmitBtn: 'Создать задачу',
    clientModalTitle: 'Новый клиент',
    clientNameLabel: 'Название',
    clientContactsLabel: 'Контакты',
    clientAdditionalLabel: 'Заметки',
    clientCancelBtn: 'Отмена',
    clientSubmitBtn: 'Сохранить',
    teamModalTitle: 'Новая команда',
    teamNameLabel: 'Название',
    teamDescLabel: 'Описание',
    teamCancelBtn: 'Отмена',
    teamSubmitBtn: 'Создать команду',
    inviteBtn: 'Пригласить',
    reportModalTitle: 'Новый отчёт',
    reportNameLabel: 'Название',
    reportStartLabel: 'Начало',
    reportEndLabel: 'Конец',
    reportTypeLabel: 'Тип',
    reportTypeProject: 'По проекту',
    reportTypeClient: 'По клиенту',
    reportTargetLabel: 'Цель',
    reportCancelBtn: 'Отмена',
    reportSubmitBtn: 'Создать отчёт',
    profileModalTitle: 'Настройки',
    profileUsernameLabel: 'Имя',
    profileUsernamePlaceholder: 'Введите имя',
    profileLanguageLabel: 'Язык',
    profileNotifLabel: 'Уведомления',
    profileCancelBtn: 'Отмена',
    profileSaveBtn: 'Сохранить',
    networkErrorMessage: 'Ошибка соединения',
    allProjects: 'Все проекты',
    allTags: 'Все теги',
    allStatuses: 'Все статусы',
    activeStatus: 'Активные',
    completedStatus: 'Выполненные',
    allPriorities: 'Все приоритеты',
    noProject: 'Без проекта',
    noTag: 'Без тега',
    personalProjects: 'Личные',
    teamProjects: 'Командные',
    noProjects: 'Нет проектов',
    noTasks: 'Нет задач',
    tasksCount: 'задач',
    completedCount: 'выполнено',
    totalProjects: 'Проектов',
    totalTasks: 'Задач',
    activeTasks: 'Активных',
    completedTasks: 'Выполнено',
    todayTasks: 'На сегодня',
    downloadExcel: 'Скачать Excel',
    taskStatusChart: 'Статусы задач',
    todayCompletion: 'Выполнение за сегодня',
    allProjectsFilter: 'Все проекты',
    myTeams: 'Мои команды',
    noTeams: 'Нет команд',
    noMembers: 'Нет участников',
    noInvites: 'Нет приглашений',
    reportTypeTeam: 'По команде',
    noTeamProjects: 'Нет проектов',
    settingsSaved: 'Сохранено',
    deleteConfirm: 'Удалить?',
    deleteProjectConfirm: 'Удалить проект и задачи?',
    deleteTeamConfirm: 'Удалить команду?',
    deleteClientConfirm: 'Удалить клиента?',
    invitationSent: 'Приглашение отправлено',
    invitationAccepted: 'Приглашение принято',
    invitationRejected: 'Приглашение отклонено',
    fillAllFields: 'Заполните поля',
    enterTaskName: 'Введите название',
    enterProjectName: 'Введите название',
    selectTeam: 'Выберите команду',
    noTeamsWarning: 'Нет команд. Создайте.',
    createTask: 'Создать задачу',
    createProject: 'Создать проект',
    accept: 'Принять',
    reject: 'Отклонить',
    noNotifications: 'Нет уведомлений',
    welcomeTitle: 'Добро пожаловать',
    welcomeSubtitle: 'Начните работу',
    newTask: 'Новая задача',
    newProject: 'Новый проект',
    back: 'Назад',
    edit: 'Изменить',
    delete: 'Удалить',
    noCategory: 'Без категории',
    noClient: 'Без клиента',
    selectProject: 'Выберите проект',
    selectClient: 'Выберите клиента',
    noReports: 'Нет отчётов',
    newClient: 'Новый клиент',
    newReport: 'Новый отчёт',
    byProject: 'По проекту',
    byClient: 'По клиенту',
    inviteMessage: 'Приглашение',
    inviteInfo: 'Используйте кнопки',
    enterTeamName: 'Название команды',
    tasksForDate: 'Задачи',
    from: 'из',
    pending: 'Ожидает',
    selected: 'Выбран',
    userNotFound: 'Не найден',
    selectUser: 'Выберите',
    invitationError: 'Ошибка',
    removeMemberConfirm: 'Удалить участника?',
    roleError: 'Ошибка',
    projectWillBecomeShared: 'Проект станет общим. Продолжить?',
    projectAddedToTeam: 'Проект добавлен',
    removeProjectConfirm: 'Убрать проект?',
    invalidEmail: 'Неверный email',
    loginError: 'Ошибка входа',
    registrationError: 'Ошибка',
    passwordsMismatch: 'Пароли не совпадают',
    passwordTooShort: 'Минимум 6 символов',
    connectionError: 'Нет соединения',
    noDescription: 'Нет описания',
    notSet: 'Не указано',
    taskDetailsTitle: 'Детали задачи'
    },
    en: {
    appTitle: 'Focus ',
    notificationsTitle: 'Notifications',
    markAllReadBtn: 'Read all',
    deleteAllNotifBtn: 'Clear all',
    create: 'Create',
    save: 'Save',
    update: 'Update',
    cancel: 'Cancel',
    taskSubmitBtn: 'Create task',
    taskUpdateBtn: 'Update task',
    inviteByEmailPlaceholder: 'Enter email or username',
    searchUserBtn: 'Search',
    inviteMemberBtn: 'Invite',
    noUserFound: 'User not found',
    enterTeamNamePlaceholder: 'Enter team name',
    teamDescriptionPlaceholder: 'Team description (optional)',
    quickTeamTitle: 'Create team',
    quickTeamNameLabel: 'Team name',
    quickTeamDescLabel: 'Description (optional)',
    quickTeamCancelBtn: 'Cancel',
    quickTeamSubmitBtn: 'Create team and project',
    teamMembersTitle: 'Team members',
    membersLabel: 'Members',
    invitedLabel: 'Invited',
    inviteByEmailLabel: 'Invite member',
    teamProjectsLabel: 'Team projects',
    addProjectBtn: 'Add',
    quickCategoryTitle: 'New category',
    quickCategorySubmitBtn: 'Create',
    quickTagTitle: 'New tag',
    quickTagSubmitBtn: 'Create',
    createInlineBtn: '+',
    searchPlaceholder: 'Search tasks...',
    filterProjectLabel: 'Project',
    filterTagLabel: 'Tag',
    filterDateLabel: 'Date',
    filterStatusLabel: 'Status',
    filterPriorityLabel: 'Priority',
    applyFilterBtn: 'Apply',
    clearFilterBtn: 'Reset',
    settingsMenu: 'Settings',
    logoutMenu: 'Log out',
    projectsMenu: 'Projects',
    teamsMenu: 'My teams',
    allTasksMenu: 'All tasks',
    clientsMenu: 'Clients',
    statisticsMenu: 'Statistics',
    reportsMenu: 'Reports',
    mon: 'Mo', tue: 'Tu', wed: 'We', thu: 'Th', fri: 'Fr', sat: 'Sa', sun: 'Su',
    projectModalTitle: 'New project',
    projectNameLabel: 'Name',
    projectNamePlaceholder: 'Enter project name',
    projectDescLabel: 'Description',
    projectDescPlaceholder: 'Brief description',
    projectTypeLabel: 'Type',
    projectTypePersonal: 'Personal',
    projectTypeTeam: 'Team',
    projectCancelBtn: 'Cancel',
    projectSubmitBtn: 'Create project',
    taskModalTitle: 'New task',
    taskTitleLabel: 'Title',
    taskTitlePlaceholder: 'Enter task title',
    taskDescLabel: 'Description',
    taskDescPlaceholder: 'Detailed description',
    taskDueLabel: 'Due date',
    taskAssigneeLabel: 'Assignee',
    taskTimeLabel: 'Time',
    taskPriorityLabel: 'Priority',
    priorityLow: 'Low',
    priorityMedium: 'Medium',
    priorityHigh: 'High',
    taskProjectLabel: 'Project',
    taskTagLabel: 'Tag',
    taskCancelBtn: 'Cancel',
    taskSubmitBtn: 'Create task',
    clientModalTitle: 'New client',
    clientNameLabel: 'Name',
    clientContactsLabel: 'Contacts',
    clientAdditionalLabel: 'Notes',
    clientCancelBtn: 'Cancel',
    clientSubmitBtn: 'Save',
    teamModalTitle: 'New team',
    teamNameLabel: 'Name',
    teamDescLabel: 'Description',
    teamCancelBtn: 'Cancel',
    teamSubmitBtn: 'Create team',
    inviteBtn: 'Invite',
    reportModalTitle: 'New report',
    reportNameLabel: 'Name',
    reportStartLabel: 'Start',
    reportEndLabel: 'End',
    reportTypeLabel: 'Type',
    reportTypeProject: 'By project',
    reportTypeClient: 'By client',
    reportTargetLabel: 'Target',
    reportCancelBtn: 'Cancel',
    reportSubmitBtn: 'Create report',
    profileModalTitle: 'Settings',
    profileUsernameLabel: 'Name',
    profileUsernamePlaceholder: 'Enter name',
    profileLanguageLabel: 'Language',
    profileNotifLabel: 'Notifications',
    profileCancelBtn: 'Cancel',
    profileSaveBtn: 'Save',
    networkErrorMessage: 'Connection error',
    allProjects: 'All projects',
    allTags: 'All tags',
    allStatuses: 'All statuses',
    activeStatus: 'Active',
    completedStatus: 'Completed',
    allPriorities: 'All priorities',
    noProject: 'No project',
    noTag: 'No tag',
    personalProjects: 'Personal',
    teamProjects: 'Team',
    noProjects: 'No projects',
    noTasks: 'No tasks',
    tasksCount: 'tasks',
    completedCount: 'done',
    totalProjects: 'Projects',
    totalTasks: 'Tasks',
    activeTasks: 'Active',
    completedTasks: 'Done',
    todayTasks: 'Today',
    downloadExcel: 'Download Excel',
    taskStatusChart: 'Task status',
    todayCompletion: 'Today progress',
    allProjectsFilter: 'All projects',
    myTeams: 'My teams',
    noTeams: 'No teams',
    noMembers: 'No members',
    noInvites: 'No invites',
    noTeamProjects: 'No projects',
    settingsSaved: 'Saved',
    deleteConfirm: 'Delete?',
    deleteProjectConfirm: 'Delete project?',
    deleteTeamConfirm: 'Delete team?',
    deleteClientConfirm: 'Delete client?',
    invitationSent: 'Invite sent',
    invitationAccepted: 'Accepted',
    invitationRejected: 'Rejected',
    fillAllFields: 'Fill all fields',
    enterTaskName: 'Enter title',
    enterProjectName: 'Enter name',
    selectTeam: 'Select team',
    noTeamsWarning: 'No teams.',
    createTask: 'Create task',
    createProject: 'Create project',
    accept: 'Accept',
    reject: 'Reject',
    noNotifications: 'No notifications',
    welcomeTitle: 'Welcome',
    welcomeSubtitle: 'Start now',
    newTask: 'New task',
    newProject: 'New project',
    back: 'Back',
    edit: 'Edit',
    delete: 'Delete',
    noCategory: 'No category',
    noClient: 'No client',
    selectProject: 'Select project',
    selectClient: 'Select client',
    noReports: 'No reports',
    newClient: 'New client',
    newReport: 'New report',
    byProject: 'By project',
    byClient: 'By client',
    inviteMessage: 'Invitation',
    inviteInfo: 'Use buttons',
    enterTeamName: 'Team name',
    tasksForDate: 'Tasks',
    from: 'of',
    pending: 'Pending',
    selected: 'Selected',
    userNotFound: 'Not found',
    selectUser: 'Select',
    invitationError: 'Error',
    removeMemberConfirm: 'Remove member?',
    roleError: 'Error',
    projectWillBecomeShared: 'Project will be shared. Continue?',
    projectAddedToTeam: 'Project added',
    removeProjectConfirm: 'Remove project?',
    invalidEmail: 'Invalid email',
    loginError: 'Login error',
    registrationError: 'Error',
    passwordsMismatch: 'Passwords dont match',
    passwordTooShort: 'Min 6 characters',
    connectionError: 'No connection',
    noDescription: 'No description',
    notSet: 'Not set',
    taskDetailsTitle: 'Task details',
    lowPriority: 'Low',
    mediumPriority: 'Medium',
    highPriority: 'High',
    inviteByEmailLabel: 'Invite by email',
    closeMembersBtn: 'Close',
    newTeam: 'New team',
    reportTypeTeam: 'By team',
    deleteAllNotifBtn: 'Delete all'
    }
};

let currentLang = 'ru';

function t(key) {
    return langData[currentLang][key] || key;
}

function applyLanguage() {
    currentLang = localStorage.getItem('language') || 'ru';
    
    var elements = [
        'appTitle', 'notificationsTitle', 'markAllReadBtn',
        'filterProjectLabel', 'filterTagLabel', 'filterDateLabel', 'filterStatusLabel', 'filterPriorityLabel',
        'applyFilterBtn', 'clearFilterBtn', 'settingsMenu', 'logoutMenu',
        'projectsMenu', 'teamsMenu', 'allTasksMenu', 'clientsMenu', 'statisticsMenu', 'reportsMenu',
        'mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun',
        'projectModalTitle', 'projectNameLabel', 'projectDescLabel', 'projectTypeLabel',
        'projectTypePersonal', 'projectTypeTeam', 'projectCancelBtn', 'projectSubmitBtn',
        'taskModalTitle', 'taskTitleLabel', 'taskDescLabel', 'taskDueLabel', 'taskTimeLabel', 'taskPriorityLabel',
        'priorityLow', 'priorityMedium', 'priorityHigh', 'taskProjectLabel', 'taskTagLabel',
        'taskCancelBtn', 'taskSubmitBtn',
        'clientModalTitle', 'clientNameLabel', 'clientContactsLabel', 'clientAdditionalLabel',
        'clientCancelBtn', 'clientSubmitBtn',
        'teamModalTitle', 'teamNameLabel', 'teamDescLabel', 'teamCancelBtn', 'teamSubmitBtn',
        'teamMembersTitle', 'membersLabel', 'invitedLabel', 'teamProjectsLabel', 'addProjectBtn',
        'quickCategoryTitle', 'quickCategoryCancelBtn', 'quickCategorySubmitBtn',
        'quickTagTitle', 'quickTagCancelBtn', 'quickTagSubmitBtn',
        'reportModalTitle', 'reportNameLabel', 'reportStartLabel', 'reportEndLabel',
        'reportTypeLabel', 'reportTypeProject', 'reportTypeClient', 'reportTargetLabel',
        'reportCancelBtn', 'reportSubmitBtn',
        'profileModalTitle', 'profileUsernameLabel', 'profileLanguageLabel', 'profileNotifLabel',
        'profileCancelBtn', 'profileSaveBtn', 'networkErrorMessage', 'taskDetailsTitle',
        'deleteAllNotifBtn', 'closeMembersBtn', 'inviteBtn', 'inviteByEmailLabel'
    ];
    
    for (var i = 0; i < elements.length; i++) {
        var el = document.getElementById(elements[i]);
        if (el) el.textContent = t(elements[i]);
    }
    
    var searchInput = document.getElementById('search-input');
    if (searchInput) searchInput.placeholder = t('searchPlaceholder');
    
    var projectName = document.getElementById('project-name');
    if (projectName) projectName.placeholder = t('projectNamePlaceholder');
    
    var projectDesc = document.getElementById('project-desc');
    if (projectDesc) projectDesc.placeholder = t('projectDescPlaceholder');
    
    var taskTitle = document.getElementById('task-title');
    if (taskTitle) taskTitle.placeholder = t('taskTitlePlaceholder');
    
    var taskDesc = document.getElementById('task-desc');
    if (taskDesc) taskDesc.placeholder = t('taskDescPlaceholder');
    
    var taskDue = document.getElementById('task-due');
    if (taskDue) taskDue.placeholder = currentLang === 'en' ? 'MM/DD/YYYY' : 'ДД.ММ.ГГГГ';
    
    var filterDate = document.getElementById('filter-date');
    if (filterDate) filterDate.placeholder = currentLang === 'en' ? 'MM/DD/YYYY' : 'ДД.ММ.ГГГГ';
    
    var clientName = document.getElementById('client-name');
    if (clientName) clientName.placeholder = t('clientNameLabel');
    
    var clientContacts = document.getElementById('client-contacts');
    if (clientContacts) clientContacts.placeholder = t('clientContactsLabel');
    
    var clientAdditional = document.getElementById('client-additional');
    if (clientAdditional) clientAdditional.placeholder = t('clientAdditionalLabel');
    
    var teamName = document.getElementById('team-name');
    if (teamName) teamName.placeholder = t('enterTeamNamePlaceholder');
    
    var teamDesc = document.getElementById('team-desc');
    if (teamDesc) teamDesc.placeholder = t('teamDescriptionPlaceholder');
    
    var inviteEmail = document.getElementById('invite-email');
    if (inviteEmail) inviteEmail.placeholder = t('inviteByEmailPlaceholder');
    
    var quickCategoryName = document.getElementById('quick-category-name');
    if (quickCategoryName) quickCategoryName.placeholder = t('quickCategoryTitle');
    
    var quickTagName = document.getElementById('quick-tag-name');
    if (quickTagName) quickTagName.placeholder = t('quickTagTitle');
    
    var reportName = document.getElementById('report-name');
    if (reportName) reportName.placeholder = t('reportNameLabel');
    
    var profileUsername = document.getElementById('profile-username');
    if (profileUsername) profileUsername.placeholder = t('profileUsernamePlaceholder');
    
    var searchUserBtn = document.getElementById('searchUserBtn');
    if (searchUserBtn) searchUserBtn.textContent = t('searchUserBtn');
    
    var inviteMemberBtn = document.getElementById('inviteMemberBtn');
    if (inviteMemberBtn) inviteMemberBtn.textContent = t('inviteMemberBtn');
    
    var quickTeamSubmitBtn = document.getElementById('quickTeamSubmitBtn');
    if (quickTeamSubmitBtn) quickTeamSubmitBtn.textContent = t('quickTeamSubmitBtn');
    
    var quickTeamCancelBtn = document.getElementById('quickTeamCancelBtn');
    if (quickTeamCancelBtn) quickTeamCancelBtn.textContent = t('cancel');
    
    var quickTeamTitle = document.getElementById('quickTeamTitle');
    if (quickTeamTitle) quickTeamTitle.textContent = t('quickTeamTitle');
    
    var quickTeamNameLabel = document.getElementById('quickTeamNameLabel');
    if (quickTeamNameLabel) quickTeamNameLabel.textContent = t('quickTeamNameLabel');
    
    var quickTeamDescLabel = document.getElementById('quickTeamDescLabel');
    if (quickTeamDescLabel) quickTeamDescLabel.textContent = t('quickTeamDescLabel');
    
    var quickTeamName = document.getElementById('quick-team-name');
    if (quickTeamName) quickTeamName.placeholder = t('enterTeamNamePlaceholder');
    
    var quickTeamDesc = document.getElementById('quick-team-desc');
    if (quickTeamDesc) quickTeamDesc.placeholder = t('teamDescriptionPlaceholder');
    
    var filterProject = document.getElementById('filter-project');
    if (filterProject && filterProject.options[0]) filterProject.options[0].text = t('allProjectsFilter');
    
    var filterTag = document.getElementById('filter-tag');
    if (filterTag && filterTag.options[0]) filterTag.options[0].text = t('allTags');
    
    var filterStatus = document.getElementById('filter-status');
    if (filterStatus) {
        if (filterStatus.options[0]) filterStatus.options[0].text = t('allStatuses');
        if (filterStatus.options[1]) filterStatus.options[1].text = t('activeStatus');
        if (filterStatus.options[2]) filterStatus.options[2].text = t('completedStatus');
    }
    
    var filterPriority = document.getElementById('filter-priority');
    if (filterPriority) {
        if (filterPriority.options[0]) filterPriority.options[0].text = t('allPriorities');
        if (filterPriority.options[1]) filterPriority.options[1].text = t('lowPriority');
        if (filterPriority.options[2]) filterPriority.options[2].text = t('mediumPriority');
        if (filterPriority.options[3]) filterPriority.options[3].text = t('highPriority');
    }
    
    var d = new Date();
    var monthNames = currentLang === 'en' 
        ? ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
        : ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'];
    var monthYearEl = document.getElementById('calendarMonthYear');
    if (monthYearEl) {
        monthYearEl.textContent = monthNames[d.getMonth()] + ' ' + d.getFullYear();
    }
    
    var profileLang = document.getElementById('profile-language');
    if (profileLang) profileLang.value = currentLang;
}

function formatDateInput(input) {
    let value = input.value.replace(/[^\d]/g, '');
    if (value.length >= 2 && value.length < 4) {
        value = value.slice(0, 2) + '.' + value.slice(2);
    } else if (value.length >= 4 && value.length < 6) {
        value = value.slice(0, 2) + '.' + value.slice(2, 4) + '.' + value.slice(4, 8);
    } else if (value.length >= 6) {
        value = value.slice(0, 2) + '.' + value.slice(2, 4) + '.' + value.slice(4, 8);
    }
    input.value = value;
}

function parseDateToISO(dateStr) {
    if (!dateStr) return null;
    let parts = dateStr.split('.');
    if (parts.length === 3) {
        return parts[2] + '-' + parts[1] + '-' + parts[0];
    }
    return dateStr;
}

function formatDate(dateStr) {
    if (!dateStr) return '';
    try {
        var cleanDateStr = dateStr.toString().split(' ')[0].split('T')[0];
        var parts = cleanDateStr.split('-');
        if (parts.length === 3) {
            return parts[2] + '.' + parts[1] + '.' + parts[0];
        }
        return dateStr;
    } catch (e) {
        return dateStr;
    }
}

function formatDateTime(dateStr) {
    if (!dateStr) return '';
    try {
        let d = new Date(dateStr);
        if (isNaN(d.getTime())) return '';
        return d.toLocaleString('ru-RU');
    } catch (e) {
        return '';
    }
}

function getToken() {
    return localStorage.getItem('access_token');
}

function escapeHtml(text) {
    if (!text) return '';
    return text.replace(/[&<>]/g, function(m) {
        if (m === '&') return '&amp;';
        if (m === '<') return '&lt;';
        if (m === '>') return '&gt;';
        return m;
    });
}

function showNetworkError(message) {
    let errorDiv = document.getElementById('network-error');
    if (errorDiv) {
        let msgSpan = document.getElementById('networkErrorMessage');
        if (msgSpan) msgSpan.textContent = message;
        errorDiv.style.display = 'block';
        setTimeout(function() { hideNetworkError(); }, 5000);
    } else {
        alert(message);
    }
}

function hideNetworkError() {
    let errorDiv = document.getElementById('network-error');
    if (errorDiv) errorDiv.style.display = 'none';
}

async function api(url, method, body) {
    if (!method) method = 'GET';
    let headers = { 'Content-Type': 'application/json' };
    let t = getToken();
    if (t) headers['Authorization'] = 'Bearer ' + t;
    
    try {
        let res = await fetch('/api' + url, {
            method: method,
            headers: headers,
            body: body ? JSON.stringify(body) : null
        });
        
        if (res.status === 401) {
            localStorage.removeItem('access_token');
            window.location.href = '/login.html';
            return null;
        }
        
        if (res.status === 204) return null;
        if (!res.ok) {
            let errorData = await res.json().catch(function() { return {}; });
            throw new Error(errorData.detail || 'HTTP ' + res.status);
        }
        return await res.json();
    } catch (error) {
        console.error('API error:', error);
        showNetworkError(error.message || t('networkErrorMessage'));
        return null;
    }
}

let projects = [];
let tasks = [];
let tags = [];
let categories = [];
let clients = [];
let reports = [];
let currentView = 'welcome';
let selectedProjectId = null;
let selectedDate = null;
let currentDate = new Date();
let projectsCollapsed = false;
let currentUserType = 1;
let teams = [];
let notifications = [];
let notificationCheckInterval = null;
let currentTeamId = null;
let currentUser = null;
let currentFilters = {
    project_id: null,
    tag_id: null,
    date: null,
    status: null,
    priority: null,
    search: ''
};

async function loadProjects() {
    let data = await api('/projects');
    if (data) projects = data;
    renderProjectsList();
    updateProjectSelects();
}

async function loadTasks() {
    let url = '/tasks?';
    if (selectedProjectId) url += 'project_id=' + selectedProjectId + '&';
    if (selectedDate) url += 'date=' + selectedDate + '&';
    if (currentFilters.tag_id) url += 'tag_id=' + currentFilters.tag_id + '&';
    if (currentFilters.status) url += 'status=' + currentFilters.status + '&';
    if (currentFilters.priority) url += 'priority=' + currentFilters.priority + '&';
    if (currentFilters.search) url += 'search=' + encodeURIComponent(currentFilters.search) + '&';
    
    let data = await api(url);
    if (data) {
        tasks = data.sort(function(a, b) {
            if (!a.due_date && !b.due_date) return 0;
            if (!a.due_date) return 1;
            if (!b.due_date) return -1;
            return a.due_date.localeCompare(b.due_date);
        });
    }
    
    renderCalendar();
}

async function loadTags() {
    let data = await api('/tags');
    if (data) tags = data;
    updateTagSelects();
}

async function loadCategories() {
    let data = await api('/categories');
    if (data) categories = data;
    updateCategorySelects();
}

async function loadClients() {
    if (currentUserType === 1) return;
    let data = await api('/clients');
    if (data) clients = data;
    if (currentView === 'clients') renderClientsList();
    updateClientSelects();
}

async function loadReports() {
    let data = await api('/reports');
    if (data) reports = data;
}

async function loadTeams() {
    let data = await api('/teams');
    if (data) teams = data;
    if (currentView === 'teams') renderTeamsList();
    updateProjectTeamSelect();
}

async function loadNotifications() {
    let data = await api('/notifications');
    if (data) {
        notifications = data;
        updateNotificationBadge();
        var dropdown = document.getElementById('notifications-dropdown');
        if (dropdown && dropdown.style.display === 'block') {
            renderNotificationsList();
        }
    }
}

function startNotificationPolling() {
    if (notificationCheckInterval) clearInterval(notificationCheckInterval);
    notificationCheckInterval = setInterval(function() {
        if (getToken()) {
            loadNotifications();
            checkDeadlineNotifications();
        }
    }, 30000);
}

function updateTagSelects() {
    let taskTag = document.getElementById('task-tag');
    let filterTag = document.getElementById('filter-tag');
    let options = '<option value="">' + t('noTag') + '</option>';
    for (var i = 0; i < tags.length; i++) {
        options += '<option value="' + tags[i].id + '">' + escapeHtml(tags[i].name) + '</option>';
    }
    if (taskTag) taskTag.innerHTML = options;
    if (filterTag) filterTag.innerHTML = '<option value="">' + t('allTags') + '</option>' + options;
}

function updateCategorySelects() {
    let select = document.getElementById('project-category');
    if (select) {
        let html = '<option value="">' + t('noCategory') + '</option>';
        for (var i = 0; i < categories.length; i++) {
            html += '<option value="' + categories[i].id + '">' + escapeHtml(categories[i].name) + '</option>';
        }
        select.innerHTML = html;
    }
}

function updateClientSelects() {
    let select = document.getElementById('project-client');
    if (select) {
        let html = '<option value="">' + t('noClient') + '</option>';
        for (var i = 0; i < clients.length; i++) {
            html += '<option value="' + clients[i].id + '">' + escapeHtml(clients[i].name) + '</option>';
        }
        select.innerHTML = html;
    }
}

function updateProjectSelects() {
    let taskProject = document.getElementById('task-project');
    if (taskProject) {
        let html = '<option value="">' + t('noProject') + '</option>';
        for (var i = 0; i < projects.length; i++) {
            var p = projects[i];
            var name = p.name;
            if (p.team_name) name += ' (' + p.team_name + ')';
            html += '<option value="' + p.id + '">' + escapeHtml(name) + '</option>';
        }
        taskProject.innerHTML = html;
        
        taskProject.onchange = async function() {
            let projectId = parseInt(this.value);
            if (projectId) {
                await loadTeamMembersForTask(projectId);
            } else {
                document.getElementById('task-assignee').innerHTML = '<option value="">Не назначен</option>';
            }
        };
    }
    
    let filterProject = document.getElementById('filter-project');
    if (filterProject) {
        let html = '<option value="">' + t('allProjectsFilter') + '</option>';
        for (var i = 0; i < projects.length; i++) {
            html += '<option value="' + projects[i].id + '">' + escapeHtml(projects[i].name) + '</option>';
        }
        filterProject.innerHTML = html;
    }
}

function updateProjectTeamSelect() {
    let teamSelect = document.getElementById('project-team');
    let warningDiv = document.getElementById('project-team-warning');
    if (teamSelect) {
        if (teams.length === 0) {
            teamSelect.innerHTML = '<option value="">' + t('noTeams') + '</option>';
            if (warningDiv) {
                warningDiv.textContent = t('noTeamsWarning');
                warningDiv.style.display = 'block';
            }
        } else {
            let html = '';
            for (var i = 0; i < teams.length; i++) {
                html += '<option value="' + teams[i].team_id + '">' + escapeHtml(teams[i].team_name) + '</option>';
            }
            teamSelect.innerHTML = html;
            if (warningDiv) warningDiv.style.display = 'none';
        }
    }
}

function updateReportTargetSelect() {
    let select = document.getElementById('report-target');
    let reportType = document.getElementById('report-type');
    if (!select) return;
    var type = reportType ? reportType.value : 'project';
    
    let clientOption = document.querySelector('#report-type option[value="client"]');
    let teamOption = document.querySelector('#report-type option[value="team"]');
    
    if (currentUserType === 1) {
        if (clientOption) clientOption.style.display = 'none';
        if (teamOption) teamOption.style.display = 'block';
        if (reportType && reportType.value === 'client') {
            reportType.value = 'project';
            type = 'project';
        }
    } else {
        if (clientOption) clientOption.style.display = 'block';
        if (teamOption) teamOption.style.display = 'none';
        if (reportType && reportType.value === 'team') {
            reportType.value = 'project';
            type = 'project';
        }
    }
    
    if (type === 'project') {
        let html = '<option value="">' + t('selectProject') + '</option>';
        let filteredProjects = projects;
        
        if (currentUserType === 1) {
            filteredProjects = projects.filter(p => p.type === 'team' && p.team_id);
        } else {
            filteredProjects = projects.filter(p => p.client_id !== null);
        }
        
        for (var i = 0; i < filteredProjects.length; i++) {
            html += '<option value="' + filteredProjects[i].id + '">' + escapeHtml(filteredProjects[i].name) + '</option>';
        }
        select.innerHTML = html;
        
    } else if (type === 'team') {
        let html = '<option value="">' + t('selectTeam') + '</option>';
        for (var i = 0; i < teams.length; i++) {
            html += '<option value="' + teams[i].team_id + '">' + escapeHtml(teams[i].team_name) + '</option>';
        }
        select.innerHTML = html;
        
    } else if (type === 'client') {
        let html = '<option value="">' + t('selectClient') + '</option>';
        for (var i = 0; i < clients.length; i++) {
            html += '<option value="' + clients[i].id + '">' + escapeHtml(clients[i].name) + '</option>';
        }
        select.innerHTML = html;
    }
}

function setupMenuByUserType() {
    var isFreelancer = (currentUserType === 2);
    
    var clientsMenu = document.getElementById('clients-menu-item');
    var teamsMenu = document.getElementById('teams-menu-item');
    var reportsMenu = document.getElementById('reports-menu');
    
    if (reportsMenu) reportsMenu.style.display = 'block';
    
    if (clientsMenu) clientsMenu.style.display = isFreelancer ? 'block' : 'none';
    if (teamsMenu) teamsMenu.style.display = isFreelancer ? 'none' : 'block';
}

function selectMenuItem(element, view) {
    var items = document.querySelectorAll('.menu-item');
    for (var i = 0; i < items.length; i++) {
        items[i].classList.remove('active');
    }
    element.classList.add('active');
    
    if (view === 'teams') showAllTeams();
    else if (view === 'tasks') showAllTasks();
    else if (view === 'clients') showAllClients();
    else if (view === 'projects') showAllProjects();
    else if (view === 'stats') showStatistics();
    else if (view === 'reports') showReports();
}

function toggleProfileMenu() {
    let menu = document.getElementById('profile-menu');
    if (menu.style.display === 'none' || !menu.style.display) {
        menu.style.display = 'block';
        setTimeout(function() {
            document.addEventListener('click', function closeMenu(e) {
                if (!e.target.closest('.profil')) {
                    menu.style.display = 'none';
                    document.removeEventListener('click', closeMenu);
                }
            });
        }, 100);
    } else {
        menu.style.display = 'none';
    }
}

function showProfileSettings() {
    var modal = document.getElementById('profile-modal');
    if (modal) modal.style.display = 'flex';
    var usernameInput = document.getElementById('profile-username');
    if (usernameInput) usernameInput.value = '';
    
    api('/profile').then(function(user) {
        if (user) {
            currentUser = user;
            if (usernameInput) usernameInput.value = user.username || '';
            var langSelect = document.getElementById('profile-language');
            if (langSelect) langSelect.value = user.language || 'ru';
            var notifCheck = document.getElementById('profile-notif');
            if (notifCheck) notifCheck.checked = user.notif_p === 1;
        }
    });
    var profileMenu = document.getElementById('profile-menu');
    if (profileMenu) profileMenu.style.display = 'none';
}

function closeProfileModal() {
    var modal = document.getElementById('profile-modal');
    if (modal) modal.style.display = 'none';
}

async function updateProfile() {
    let username = document.getElementById('profile-username').value.trim();
    let language = document.getElementById('profile-language').value;
    let notif = document.getElementById('profile-notif').checked ? 1 : 0;

    let body = { language: language, notif_p: notif };
    if (username) body.username = username;

    let result = await api('/profile', 'PUT', body);
    if (result) {
        if (username) {
            var avatar = document.getElementById('avatar');
            if (avatar) avatar.textContent = username.charAt(0).toUpperCase();
        }
        closeProfileModal();
        if (language !== currentLang) {
            switchLanguage(language);
        } else {
            alert(t('settingsSaved'));
            await loadProjects();
            await loadTasks();
            await loadTeams();
            await loadNotifications();
        }
    }
}

function updateNotificationBadge() {
    var unread = 0;
    for (var i = 0; i < notifications.length; i++) {
        if (!notifications[i].is_read) unread++;
    }
    var badge = document.getElementById('notification-badge');
    if (badge) {
        badge.textContent = unread;
        badge.style.display = unread > 0 ? 'inline-block' : 'none';
    }
}

function toggleNotifications(event) {
    event.stopPropagation();
    var dropdown = document.getElementById('notifications-dropdown');
    if (dropdown.style.display === 'block') {
        dropdown.style.display = 'none';
    } else {
        dropdown.style.display = 'block';
        renderNotificationsList();
    }
}

async function deleteNotification(notifId) {
    await api('/notifications/' + notifId + '/delete', 'DELETE').catch(function(){});
    await loadNotifications();
    renderNotificationsList();
}

async function deleteAllNotifications(event) {
    event.stopPropagation();
    if (!confirm('Удалить все уведомления?')) return;
    
    let result = await api('/notifications/delete-all', 'DELETE');
    if (result) {
        await loadNotifications();
        renderNotificationsList();
        alert('Все уведомления удалены');
    }
}

function renderNotificationsList() {
    var container = document.getElementById('notifications-list');
    if (!container) return;
    
    if (notifications.length === 0) {
        container.innerHTML = '<div style="padding:20px;text-align:center;color:#999;">' + t('noNotifications') + '</div>';
        return;
    }
    
    var html = '';
    
    for (var i = 0; i < notifications.length; i++) {
        var n = notifications[i];
        var icon = '📢';
        if (n.type === 'invite') icon = '👥';
        if (n.type === 'deadline') icon = '📅';
        if (n.type === 'reminder') icon = '🔔';
        
        html += '<div class="notification-item ' + (n.is_read ? '' : 'unread') + '" data-notif-id="' + n.id + '" data-task-id="' + (n.task_id || '') + '" style="position:relative;">';
        html += '<button onclick="event.stopPropagation();deleteNotification(' + n.id + ')" style="position:absolute;top:8px;right:12px;background:none;border:none;cursor:pointer;font-size:18px;color:#999;">✕</button>';
        html += '<div style="display:flex;align-items:center;gap:8px;padding-right:30px;">';
        html += '<span style="font-size:16px;">' + icon + '</span>';
        html += '<span style="flex:1;">' + escapeHtml(n.message) + '</span>';
        html += '</div>';
        html += '<div style="font-size:11px;color:#999;margin-top:4px;">' + formatDateTime(n.created_at) + '</div>';
        
        if (n.type === 'invite' && !n.is_read) {
            html += '<div style="margin-top:8px;display:flex;gap:8px;">';
            html += '<button style="padding:4px 12px;background:#4CAF50;color:white;border:none;border-radius:6px;cursor:pointer;" onclick="event.stopPropagation();acceptInvite(' + n.id + ')">✓ ' + t('accept') + '</button>';
            html += '<button style="padding:4px 12px;background:#f5f5f7;border:none;border-radius:6px;cursor:pointer;" onclick="event.stopPropagation();rejectInvite(' + n.id + ')">✗ ' + t('reject') + '</button>';
            html += '</div>';
        }
        
        html += '</div>';
    }
    
    container.innerHTML = html;
    
    var items = container.querySelectorAll('.notification-item');
    for (var i = 0; i < items.length; i++) {
        (function(item) {
            item.addEventListener('click', function(e) {
                if (e.target.tagName === 'BUTTON') return;
                
                var notifId = parseInt(item.getAttribute('data-notif-id'));
                var taskId = item.getAttribute('data-task-id');
                
                api('/notifications/' + notifId + '/read', 'PUT').then(function() {
                    loadNotifications();
                }).catch(function(){});
                
                var dropdown = document.getElementById('notifications-dropdown');
                if (dropdown) dropdown.style.display = 'none';
                
                if (taskId) {
                    loadTasks().then(function() {
                        var tid = parseInt(taskId);
                        for (var j = 0; j < tasks.length; j++) {
                            if (tasks[j].id === tid) {
                                showTaskDetails(tid);
                                return;
                            }
                        }
                    });
                }
            });
        })(items[i]);
    }
}

async function acceptInvite(notificationId) {
    let result = await api('/notifications/' + notificationId + '/accept', 'POST');
    if (result) {
        await loadNotifications();
        await loadTeams();
        await loadProjects();
        renderNotificationsList();
        if (currentView === 'teams') renderTeamsList();
        updateProjectTeamSelect();
        renderProjectsList();
        alert(t('invitationAccepted'));
    }
}

async function rejectInvite(notificationId) {
    let result = await api('/notifications/' + notificationId + '/reject', 'POST');
    if (result) {
        await loadNotifications();
        renderNotificationsList();
        alert(t('invitationRejected'));
    }
}

async function markAllNotificationsRead(event) {
    event.stopPropagation();
    let result = await api('/notifications/read-all', 'PUT');
    if (result) {
        await loadNotifications();
        renderNotificationsList();
    }
}

function showWelcome() {
    currentView = 'welcome';
    selectedProjectId = null;
    selectedDate = null;
    
    let container = document.getElementById('main-container');
    container.innerHTML = `
        <div class="welcome-screen">
            <div class="welcome-icon">📋</div>
            <h1>${t('welcomeTitle')}</h1>
            <p>${t('welcomeSubtitle')}</p>
            <div class="welcome-buttons">
                <button class="welcome-btn" onclick="showTaskModal()">+ ${t('createTask')}</button>
                <button class="welcome-btn" onclick="showProjectModal()">+ ${t('createProject')}</button>
            </div>
        </div>
    `;
}

function renderProjectsAsList() {
    let container = document.getElementById('projects-list');
    if (!container) return;
    
    if (projects.length === 0) {
        container.innerHTML = '<div class="empty-state">✨ Нет проектов. Создайте первый проект!</div>';
        return;
    }
    
    let html = '';
    for (let i = 0; i < projects.length; i++) {
        let p = projects[i];
        
        let projectTasks = tasks.filter(t => t.project_id === p.id);
        let completedCount = projectTasks.filter(t => t.status === 'completed').length;
        let activeCount = projectTasks.filter(t => t.status === 'active').length;
        
        let teamInfo = p.team_name ? `<span>👥 ${escapeHtml(p.team_name)}</span>` : '';
        
        html += `
            <div class="task-card" onclick="showProjectTasksFromList(${p.id})">
                <div class="task-header">
                    <div class="task-title" style="font-weight: 600;">📁 ${escapeHtml(p.name)}</div>
                    <div class="task-actions">
                        <button onclick="event.stopPropagation(); editProject(${p.id})">✏️</button>
                        <button onclick="event.stopPropagation(); deleteProject(${p.id})">🗑️</button>
                    </div>
                </div>
                ${p.description ? `<div class="task-desc">${escapeHtml(p.description)}</div>` : ''}
                <div class="task-meta">
                    <span>📋 ${projectTasks.length} задач</span>
                    <span>🟢 ${activeCount} активных</span>
                    <span>✅ ${completedCount} выполнено</span>
                    ${teamInfo}
                </div>
            </div>
        `;
    }
    container.innerHTML = html;
}

async function showProjectTasksFromList(projectId) {
    selectedProjectId = projectId;
    selectedDate = null;
    currentView = 'tasks';
    
    let project = projects.find(p => p.id === projectId);
    await loadTasks();
    
    let container = document.getElementById('main-container');
    container.innerHTML = `
        <div class="tasks-header">
            <div>
                <button class="back-btn" onclick="showAllProjects()">← Назад к проектам</button>
                <h2>📁 ${escapeHtml(project.name)}</h2>
            </div>
            <button class="new-task-btn" onclick="showTaskModal(null, ${projectId})">+ Новая задача</button>
        </div>
        <div id="tasks-list" class="tasks-list"></div>
    `;
    
    renderTasks();
}

function showAllProjects() {
    selectedProjectId = null;
    selectedDate = null;
    currentView = 'projects';
    
    let container = document.getElementById('main-container');
    container.innerHTML = `
        <div class="tasks-header">
            <h2>📁 Все проекты</h2>
            <button class="new-task-btn" onclick="showProjectModal()">+ Новый проект</button>
        </div>
        <div id="projects-list" class="tasks-list"></div>
    `;
    renderProjectsAsList();
}

function renderAllProjects() {
    let container = document.getElementById('all-projects-list');
    if (!container) return;
    
    var personal = [];
    var team = [];
    for (var i = 0; i < projects.length; i++) {
        if (projects[i].type === 'personal') personal.push(projects[i]);
        else team.push(projects[i]);
    }
    
    var html = '';
    
    if (personal.length > 0) {
        html += '<div class="project-group-title" style="margin-top:0;">👤 ' + t('personalProjects') + '</div>';
        for (var i = 0; i < personal.length; i++) {
            html += renderProjectCard(personal[i]);
        }
    }
    
    if (team.length > 0) {
        html += '<div class="project-group-title" style="margin-top:16px;">👥 ' + t('teamProjects') + '</div>';
        for (var i = 0; i < team.length; i++) {
            html += renderProjectCard(team[i]);
        }
    }
    
    if (projects.length === 0) {
        html = '<div class="empty-state">✨ ' + t('noProjects') + '</div>';
    }
    
    container.innerHTML = html;
}

function renderProjectCard(p) {
    var projectTasks = [];
    for (var i = 0; i < tasks.length; i++) {
        if (tasks[i].project_id === p.id) projectTasks.push(tasks[i]);
    }
    var completedCount = 0;
    for (var i = 0; i < projectTasks.length; i++) {
        if (projectTasks[i].status === 'completed') completedCount++;
    }
    var teamInfo = p.team_name ? '<div class="project-card-team">👥 ' + escapeHtml(p.team_name) + '</div>' : '';
    
    return `
        <div class="project-card" onclick="showProjectTasksMain(${p.id})">
            <div class="project-card-header">
                <span class="project-card-icon">📁</span>
                <h3>${escapeHtml(p.name)}</h3>
                <button class="delete-project-btn" onclick="event.stopPropagation(); deleteProject(${p.id})">🗑️</button>
            </div>
            ${p.description ? '<p class="project-card-desc">' + escapeHtml(p.description) + '</p>' : ''}
            ${teamInfo}
            <div class="project-card-meta">
                <span>📋 ${projectTasks.length} ${t('tasksCount')}</span>
                <span>✅ ${completedCount} ${t('completedCount')}</span>
            </div>
        </div>
    `;
}

function showAllClients() {
    if (currentUserType === 1) return;
    
    currentView = 'clients';
    let container = document.getElementById('main-container');
    container.innerHTML = `
        <div class="clients-header">
            <h2>👥 ${t('clientsMenu')}</h2>
            <button class="new-client-btn" onclick="showClientModal()">+ ${t('newClient')}</button>
        </div>
        <div id="all-clients-list" class="all-clients-list"></div>
    `;
    renderClientsList();
}

function renderClientsList() {
    let container = document.getElementById('all-clients-list');
    if (!container) return;
    
    if (clients.length === 0) {
        container.innerHTML = '<div class="empty-state">✨ ' + t('noClients') + '</div>';
        return;
    }
    
    var html = '';
    for (var i = 0; i < clients.length; i++) {
        var c = clients[i];
        html += `
            <div class="client-card">
                <div class="client-card-header">
                    <span class="client-card-icon">👥</span>
                    <h3>${escapeHtml(c.name)}</h3>
                    <div style="display:flex;gap:8px;">
                        <button class="edit-btn" onclick="editClient(${c.id})">✏️</button>
                        <button class="delete-client-btn" onclick="deleteClient(${c.id})">🗑️</button>
                    </div>
                </div>
                <p class="client-card-contacts">📞 ${escapeHtml(c.contacts)}</p>
                ${c.additional ? '<p class="client-card-additional">📝 ' + escapeHtml(c.additional) + '</p>' : ''}
            </div>
        `;
    }
    container.innerHTML = html;
}

async function showAllTasks() {
    selectedProjectId = null;
    selectedDate = null;
    currentView = 'tasks';
    
    await loadTasks();
    
    var filterTagsHtml = '<option value="">' + t('allTags') + '</option>';
    for (var i = 0; i < tags.length; i++) {
        filterTagsHtml += '<option value="' + tags[i].id + '">' + escapeHtml(tags[i].name) + '</option>';
    }
    
    let container = document.getElementById('main-container');
    container.innerHTML = `
        <div class="tasks-header">
            <h2>📋 ${t('allTasksMenu')}</h2>
            <button class="new-task-btn" onclick="showTaskModal()">+ ${t('newTask')}</button>
        </div>
        <div class="main-filter-bar">
            <select id="main-filter-tag" onchange="applyTagFilter(this.value)">
                ${filterTagsHtml}
            </select>
            <select id="main-filter-status" onchange="applyStatusFilter(this.value)">
                <option value="">${t('allStatuses')}</option>
                <option value="active">🟢 ${t('activeStatus')}</option>
                <option value="completed">✅ ${t('completedStatus')}</option>
            </select>
            <select id="main-filter-priority" onchange="applyPriorityFilter(this.value)">
                <option value="">${t('allPriorities')}</option>
                <option value="low">🟢 ${t('lowPriority')}</option>
                <option value="medium">🟡 ${t('mediumPriority')}</option>
                <option value="high">🔴 ${t('highPriority')}</option>
            </select>
        </div>
        <div id="tasks-list" class="tasks-list"></div>
    `;
    
    renderTasks();
}

function renderTasks() {
    var container = document.getElementById('tasks-list');
    if (!container) return;
    
    if (tasks.length === 0) {
        container.innerHTML = '<div class="empty-state">✨ Нет задач</div>';
        return;
    }
    
    var html = '';
    for (var i = 0; i < tasks.length; i++) {
        var task = tasks[i];
        var project = null;
        for (var j = 0; j < projects.length; j++) {
            if (projects[j].id === task.project_id) {
                project = projects[j];
                break;
            }
        }
        var teamName = project ? project.team_name : null;
        
        var priorityText = task.priority;
        if (task.priority === 'high') priorityText = 'Высокий';
        if (task.priority === 'medium') priorityText = 'Средний';
        if (task.priority === 'low') priorityText = 'Низкий';
        
        var timeDisplay = '';
        if (task.task_time) {
            var timeVal = task.task_time.toString();
            if (timeVal.length > 5) timeVal = timeVal.substring(0, 5);
            timeDisplay = '<span>⏰ ' + timeVal + '</span>';
        }
        
        var dateDisplay = '';
        if (task.due_date) {
            dateDisplay = '<span>📅 ' + formatDate(task.due_date) + '</span>';
        }
        
        var assigneeText = '';
        if (task.assigned_to_username) {
            assigneeText = '<span>👤 ' + escapeHtml(task.assigned_to_username) + '</span> ';
        }
        
        html += '<div class="task-card" data-task-id="' + task.id + '">';
        html += '<div class="task-header">';
        html += '<input type="checkbox" ' + (task.status === 'completed' ? 'checked' : '') + ' onchange="toggleTask(' + task.id + ',\'' + task.status + '\')">';
        html += '<div class="task-title ' + (task.status === 'completed' ? 'completed' : '') + '">' + escapeHtml(task.title) + '</div>';
        html += '<div class="task-priority priority-' + task.priority + '">' + priorityText + '</div>';
        html += '<div class="task-actions">';
        html += '<button onclick="event.stopPropagation();editTask(' + task.id + ')">✏️</button>';
        html += '<button onclick="event.stopPropagation();deleteTask(' + task.id + ')">🗑️</button>';
        html += '</div></div>';
        
        if (task.description) {
            html += '<div class="task-desc">' + escapeHtml(task.description) + '</div>';
        }
        
        html += '<div class="task-meta">';
        html += dateDisplay + ' ' + timeDisplay + ' ';
        if (task.tag_name) html += '<span>🏷️ ' + escapeHtml(task.tag_name) + '</span> ';
        if (project) html += '<span>📁 ' + escapeHtml(project.name) + '</span> ';
        if (teamName) html += '<span>👥 ' + escapeHtml(teamName) + '</span> ';
        html += assigneeText;
        html += '</div></div>';
    }
    
    container.innerHTML = html;
    
    var cards = container.querySelectorAll('.task-card');
    for (var i = 0; i < cards.length; i++) {
        cards[i].onclick = function(e) {
            if (e.target.tagName === 'BUTTON' || e.target.tagName === 'INPUT') return;
            showTaskDetails(parseInt(this.getAttribute('data-task-id')));
        };
    }
}

async function checkDeadlineNotifications() {
    try {
        let result = await api('/tasks/deadline-notifications');
        if (result && result.notifications_created > 0) {
            await loadNotifications();
            updateNotificationBadge();
        }
    } catch(e) {
        console.log('Ошибка:', e);
    }
}

function closeTaskDetailsModal() {
    var modal = document.getElementById('task-details-modal');
    if (modal) modal.style.display = 'none';
}

function showTaskDetails(taskId) {
    var task = null;
    for (var i = 0; i < tasks.length; i++) {
        if (tasks[i].id === taskId) {
            task = tasks[i];
            break;
        }
    }
    if (!task) return;
    
    var project = null;
    for (var i = 0; i < projects.length; i++) {
        if (projects[i].id === task.project_id) {
            project = projects[i];
            break;
        }
    }
    
    var formattedDate = task.due_date ? formatDate(task.due_date) : t('notSet');
    var formattedTime = '';
    if (task.task_time) {
        formattedTime = ' в ' + task.task_time.toString().substring(0, 5);
    }
    
    var priorityMap = {
        'high': t('priorityHigh'),
        'medium': t('priorityMedium'),
        'low': t('priorityLow')
    };
    
    var statusText = task.status === 'completed' ? '✅ Выполнена' : '🟢 Активна';
    var statusColor = task.status === 'completed' ? '#16a34a' : '#e91e63';
    
    var content = document.getElementById('task-details-content');
    if (content) {
        content.innerHTML = `
            <div style="margin-bottom:16px;">
                <span style="background:${statusColor};color:white;padding:4px 12px;border-radius:8px;font-size:13px;font-weight:500;">
                    ${statusText}
                </span>
            </div>
            <p><strong>${t('taskTitleLabel')}:</strong> ${escapeHtml(task.title)}</p>
            <p><strong>${t('taskDescLabel')}:</strong> ${escapeHtml(task.description || t('noDescription'))}</p>
            <p><strong>${t('taskDueLabel')}:</strong> ${formattedDate}${formattedTime}</p>
            <p><strong>${t('taskPriorityLabel')}:</strong> ${priorityMap[task.priority] || task.priority}</p>
            <p><strong>${t('taskProjectLabel')}:</strong> ${project ? escapeHtml(project.name) : t('noProject')}</p>
        `;
    }
    
    var modal = document.getElementById('task-details-modal');
    if (modal) {
        modal.style.display = 'flex';
        
        var editBtn = document.getElementById('taskDetailsEditBtn');
        var closeBtn = document.getElementById('taskDetailsCloseBtn');
        
        if (editBtn) {
            if (task.status === 'completed') {
                editBtn.textContent = '↩ Восстановить';
                editBtn.style.background = '#f5f5f7';
                editBtn.style.color = '#1d1d1f';
                editBtn.onclick = async function() {
                    await api('/tasks/' + taskId, 'PUT', { status: 'active' });
                    closeTaskDetailsModal();
                    await loadTasks();
                    if (currentView === 'tasks') renderTasks();
                    renderCalendar();
                };
            } else {
                editBtn.textContent = '✅ Выполнено';
                editBtn.style.background = '#16a34a';
                editBtn.style.color = 'white';
                editBtn.onclick = async function() {
                    await api('/tasks/' + taskId, 'PUT', { status: 'completed' });
                    closeTaskDetailsModal();
                    await loadTasks();
                    if (currentView === 'tasks') renderTasks();
                    renderCalendar();
                };
            }
        }
        
        if (closeBtn) {
            closeBtn.onclick = closeTaskDetailsModal;
        }
    }
}

async function showStatistics() {
    selectedProjectId = null;
    selectedDate = null;
    currentView = 'stats';

    let container = document.getElementById('main-container');
    container.innerHTML = `
        <div class="stats-header"><h2>📊 Статистика</h2></div>
        <div class="stats-container">
            <div class="stat-card"><div class="stat-number" id="stat-projects">--</div><div class="stat-label">📁 Проектов</div></div>
            <div class="stat-card"><div class="stat-number" id="stat-tasks">--</div><div class="stat-label">📋 Задач</div></div>
            <div class="stat-card"><div class="stat-number" id="stat-active">--</div><div class="stat-label">🟢 Активных</div></div>
            <div class="stat-card"><div class="stat-number" id="stat-completed">--</div><div class="stat-label">✅ Выполнено</div></div>
            <div class="stat-card"><div class="stat-number" id="stat-today">--</div><div class="stat-label">📅 На сегодня</div></div>
        </div>
        <div style="display:flex;gap:20px;justify-content:center;flex-wrap:wrap;max-width:900px;margin:20px auto;">
            <div style="background:white;border-radius:16px;padding:20px;text-align:center;border:1px solid #e8e8ed;flex:1;min-width:300px;">
                <h3>📊 Статусы задач</h3>
                <canvas id="chart-donut" width="200" height="200"></canvas>
            </div>
            <div style="background:white;border-radius:16px;padding:20px;text-align:center;border:1px solid #e8e8ed;flex:1;min-width:400px;">
                <h3>📈 Задачи на неделе</h3>
                <canvas id="chart-bars" width="400" height="250"></canvas>
            </div>
        </div>
    `;

    await new Promise(r => setTimeout(r, 50));
    
    var stats = await api('/stats');
    if (stats) {
        document.getElementById('stat-projects').textContent = stats.total_projects || 0;
        document.getElementById('stat-tasks').textContent = stats.total_tasks || 0;
        document.getElementById('stat-active').textContent = stats.active_tasks || 0;
        document.getElementById('stat-completed').textContent = stats.completed_tasks || 0;
        document.getElementById('stat-today').textContent = stats.today_tasks || 0;
    }

    var c1 = document.getElementById('chart-donut');
    if (c1) {
        var ctx = c1.getContext('2d');
        var completed = stats.completed_tasks || 0;
        var active = stats.active_tasks || 0;
        var total = completed + active || 1;
        var cx = 100, cy = 100, r = 80;
        
        ctx.clearRect(0, 0, 200, 200);
        
        ctx.beginPath();
        ctx.moveTo(cx, cy);
        ctx.arc(cx, cy, r, -Math.PI/2, -Math.PI/2 + (completed/total) * 2 * Math.PI);
        ctx.fillStyle = '#16a34a';
        ctx.fill();
        
        ctx.beginPath();
        ctx.moveTo(cx, cy);
        ctx.arc(cx, cy, r, -Math.PI/2 + (completed/total) * 2 * Math.PI, -Math.PI/2 + 2 * Math.PI);
        ctx.fillStyle = '#e91e63';
        ctx.fill();
        
        ctx.beginPath();
        ctx.arc(cx, cy, 45, 0, 2 * Math.PI);
        ctx.fillStyle = 'white';
        ctx.fill();
        
        ctx.fillStyle = '#1d1d1f';
        ctx.font = 'bold 18px sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(Math.round(completed/total*100) + '%', cx, cy);
        
        var legendDiv = document.createElement('div');
        legendDiv.style.cssText = 'text-align:center;margin-top:10px;font-size:13px;';
        legendDiv.innerHTML = '<span style="color:#16a34a;">● Выполнено: ' + completed + '</span> &nbsp;&nbsp; <span style="color:#e91e63;">● Активных: ' + active + '</span>';
        c1.parentNode.appendChild(legendDiv);
    }

    var c2 = document.getElementById('chart-bars');
    if (c2) {
        var ctx2 = c2.getContext('2d');
        var w = 400, h = 250;
        var days = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];
        var barW = 35, gap = 18, startX = 35, bottomY = h - 35;
        
        var today = new Date();
        var dayOfWeek = today.getDay() || 7;
        var monday = new Date(today);
        monday.setDate(today.getDate() - dayOfWeek + 1);
        
        var maxVal = 0;
        var data = [];
        
        for (var i = 0; i < 7; i++) {
            var d = new Date(monday);
            d.setDate(monday.getDate() + i);
            var ds = d.getFullYear() + '-' + String(d.getMonth()+1).padStart(2,'0') + '-' + String(d.getDate()).padStart(2,'0');
            var cnt = 0;
            for (var j = 0; j < tasks.length; j++) {
                if (tasks[j].due_date === ds && tasks[j].status === 'completed') cnt++;
            }
            data.push({ day: days[i], count: cnt });
            if (cnt > maxVal) maxVal = cnt;
        }
        if (maxVal === 0) maxVal = 5;
        
        ctx2.clearRect(0, 0, w, h);
        
        for (var i = 0; i <= maxVal; i++) {
            var y = bottomY - (i / maxVal) * (bottomY - 30);
            ctx2.strokeStyle = '#f0f0f0';
            ctx2.beginPath();
            ctx2.moveTo(30, y);
            ctx2.lineTo(w - 20, y);
            ctx2.stroke();
            ctx2.fillStyle = '#999';
            ctx2.font = '10px sans-serif';
            ctx2.textAlign = 'right';
            ctx2.fillText(i, 25, y + 3);
        }
        
        for (var i = 0; i < data.length; i++) {
            var x = startX + i * (barW + gap);
            var barH = (data[i].count / maxVal) * (bottomY - 30);
            
            ctx2.fillStyle = '#16a34a';
            ctx2.fillRect(x, bottomY - barH, barW, barH);
            
            ctx2.fillStyle = '#666';
            ctx2.font = '11px sans-serif';
            ctx2.textAlign = 'center';
            ctx2.fillText(data[i].day, x + barW/2, h - 8);
            
            if (data[i].count > 0) {
                ctx2.fillStyle = '#1d1d1f';
                ctx2.font = 'bold 11px sans-serif';
                ctx2.fillText(data[i].count, x + barW/2, bottomY - barH - 8);
            }
        }
    }
}

async function loadTeamMembersForTask(projectId) {
    if (!projects || projects.length === 0) {
        await loadProjects();
    }
    
    let project = projects.find(p => p.id === projectId);
    if (!project || !project.team_id) {
        document.getElementById('task-assignee').innerHTML = '<option value="">Не назначен</option>';
        return;
    }
    
    let members = await api('/teams/' + project.team_id + '/members');
    let html = '<option value="">Не назначен</option>';
    if (members && members.length > 0) {
        for (let m of members) {
            html += `<option value="${m.user_id}">${escapeHtml(m.username)} (${m.role === 'manager' ? 'менеджер' : 'участник'})</option>`;
        }
    }
    document.getElementById('task-assignee').innerHTML = html;
}

function downloadStatisticsExcel() {
    let token = getToken();
    fetch('/api/stats/export', {
        headers: { 'Authorization': 'Bearer ' + token }
    })
    .then(function(response) {
        if (!response.ok) throw new Error('Export failed');
        return response.blob();
    })
    .then(function(blob) {
        var url = window.URL.createObjectURL(blob);
        var a = document.createElement('a');
        a.href = url;
        a.download = 'statistics.xlsx';
        document.body.appendChild(a);
        a.click();
        a.remove();
        window.URL.revokeObjectURL(url);
    })
    .catch(function(error) {
        showNetworkError('Error downloading: ' + error.message);
    });
}

function renderProjectsList() {
    let container = document.getElementById('projects-container');
    if (!container) return;
    
    var personal = [];
    var team = [];
    for (var i = 0; i < projects.length; i++) {
        if (projects[i].type === 'personal') personal.push(projects[i]);
        else team.push(projects[i]);
    }
    
    var html = '';
    if (personal.length > 0) {
        html += '<div class="project-group-title">👤 ' + t('personalProjects') + '</div>';
        for (var i = 0; i < personal.length; i++) {
            var p = personal[i];
            html += `
                <div class="project-item ${selectedProjectId === p.id ? 'selected' : ''}" onclick="showProjectTasksLeft(${p.id})">
                    <div class="project-name">
                        <span>📁 ${escapeHtml(p.name)}</span>
                        <button class="delete-project-btn" onclick="event.stopPropagation(); deleteProject(${p.id})">🗑️</button>
                    </div>
                    ${p.description ? '<div class="project-desc">' + escapeHtml(p.description) + '</div>' : ''}
                </div>
            `;
        }
    }
    if (team.length > 0) {
        html += '<div class="project-group-title">👥 ' + t('teamProjects') + '</div>';
        for (var i = 0; i < team.length; i++) {
            var p = team[i];
            html += `
                <div class="project-item ${selectedProjectId === p.id ? 'selected' : ''}" onclick="showProjectTasksLeft(${p.id})">
                    <div class="project-name">
                        <span>📁 ${escapeHtml(p.name)} <small>(${escapeHtml(p.team_name || '')})</small></span>
                        <button class="delete-project-btn" onclick="event.stopPropagation(); deleteProject(${p.id})">🗑️</button>
                    </div>
                    ${p.description ? '<div class="project-desc">' + escapeHtml(p.description) + '</div>' : ''}
                </div>
            `;
        }
    }
    if (html === '') html = '<div class="empty-projects">✨ ' + t('noProjects') + '</div>';
    container.innerHTML = html;
}

function toggleProjects() {
    projectsCollapsed = !projectsCollapsed;
    var container = document.getElementById('projects-container');
    var btn = document.getElementById('toggle-projects-btn');
    
    if (projectsCollapsed) {
        container.style.display = 'none';
        btn.innerHTML = '▶';
    } else {
        container.style.display = 'block';
        btn.innerHTML = '▼';
    }
}

async function showProjectTasksLeft(projectId) {
    selectedProjectId = projectId;
    selectedDate = null;
    currentView = 'tasks';
    
    var project = null;
    for (var i = 0; i < projects.length; i++) {
        if (projects[i].id === projectId) {
            project = projects[i];
            break;
        }
    }
    await loadTasks();
    
    let container = document.getElementById('main-container');
    container.innerHTML = `
        <div class="tasks-header">
            <h2>📁 ${escapeHtml(project.name)} ${project.team_name ? '<small>(' + escapeHtml(project.team_name) + ')</small>' : ''}</h2>
            <button class="new-task-btn" onclick="showTaskModal(null, ${projectId})">+ ${t('newTask')}</button>
        </div>
        <div id="tasks-list" class="tasks-list"></div>
    `;
    
    renderTasks();
    
    var items = document.querySelectorAll('.project-item');
    for (var i = 0; i < items.length; i++) {
        items[i].classList.remove('selected');
    }
}

async function showProjectTasksMain(projectId) {
    selectedProjectId = projectId;
    selectedDate = null;
    currentView = 'tasks';
    
    var project = null;
    for (var i = 0; i < projects.length; i++) {
        if (projects[i].id === projectId) {
            project = projects[i];
            break;
        }
    }
    await loadTasks();
    
    let container = document.getElementById('main-container');
    container.innerHTML = `
        <div class="tasks-header">
            <div>
                <button class="back-btn" onclick="showAllProjects()">← ${t('back')}</button>
                <h2>📁 ${escapeHtml(project.name)} ${project.team_name ? '<small>(' + escapeHtml(project.team_name) + ')</small>' : ''}</h2>
            </div>
            <button class="new-task-btn" onclick="showTaskModal(null, ${projectId})">+ ${t('newTask')}</button>
        </div>
        <div id="tasks-list" class="tasks-list"></div>
    `;
    
    renderTasks();
}

async function selectDate(dateStr) {
    selectedDate = dateStr;
    selectedProjectId = null;
    currentView = 'tasks';
    await loadTasks();
    
    var formatted = formatDate(dateStr);
    let container = document.getElementById('main-container');
    container.innerHTML = `
        <div class="tasks-header">
            <h2>📅 ${t('tasksForDate')} ${formatted}</h2>
            <button class="new-task-btn" onclick="showTaskModal('${dateStr}')">+ ${t('newTask')}</button>
        </div>
        <div id="tasks-list" class="tasks-list"></div>
    `;
    
    renderTasks();
    var items = document.querySelectorAll('.project-item');
    for (var i = 0; i < items.length; i++) {
        items[i].classList.remove('selected');
    }
}

function showTaskModal(selectedDateFromCalendar, preselectedProjectId) {
    var modal = document.getElementById('task-modal');
    if (modal) modal.style.display = 'flex';
    
    document.getElementById('task-title').value = '';
    document.getElementById('task-desc').value = '';
    
    var dueDateInput = document.getElementById('task-due');
    if (dueDateInput) {
        if (selectedDateFromCalendar) {
            var parts = selectedDateFromCalendar.split('-');
            if (parts.length === 3) {
                dueDateInput.value = parts[2] + '.' + parts[1] + '.' + parts[0];
            } else {
                dueDateInput.value = selectedDateFromCalendar;
            }
        } else {
            var today = new Date();
            dueDateInput.value = today.getDate().toString().padStart(2, '0') + '.' + 
                                (today.getMonth() + 1).toString().padStart(2, '0') + '.' + 
                                today.getFullYear();
        }
    }
    
    var now = new Date();
    var timeInput = document.getElementById('task-time');
    if (timeInput) {
        timeInput.value = now.getHours().toString().padStart(2, '0') + ':' + 
                          now.getMinutes().toString().padStart(2, '0');
    }
    
    document.getElementById('task-priority').value = 'medium';
    
    updateProjectSelects();
    updateTagSelects();
    
    if (preselectedProjectId) {
        setTimeout(function() {
            var projectSelect = document.getElementById('task-project');
            if (projectSelect) projectSelect.value = preselectedProjectId;
        }, 100);
    }
    
    var btn = document.querySelector('#task-modal .submit-btn');
    if (btn) {
        btn.textContent = t('createTask');
        btn.onclick = createTask;
    }
}

function toggleFilterPanel() {
    var panel = document.getElementById('filter-panel');
    if (panel.style.display === 'none' || !panel.style.display) {
        panel.style.display = 'block';
    } else {
        panel.style.display = 'none';
    }
}

async function applyFilters() {
    currentFilters.tag_id = document.getElementById('filter-tag').value || null;
    currentFilters.status = document.getElementById('filter-status').value || null;
    currentFilters.priority = document.getElementById('filter-priority').value || null;
    currentFilters.date = document.getElementById('filter-date').value || null;
    currentFilters.project_id = document.getElementById('filter-project').value || null;
    
    selectedProjectId = currentFilters.project_id ? parseInt(currentFilters.project_id) : null;
    selectedDate = currentFilters.date;
    
    await loadTasks();
    document.getElementById('filter-panel').style.display = 'none';
    if (currentView === 'tasks') renderTasks();
}

function clearAllFilters() {
    var ids = ['filter-tag', 'filter-status', 'filter-priority', 'filter-date', 'filter-project'];
    for (var i = 0; i < ids.length; i++) {
        var el = document.getElementById(ids[i]);
        if (el) el.value = '';
    }
    
    currentFilters = {
        project_id: null,
        tag_id: null,
        date: null,
        status: null,
        priority: null,
        search: ''
    };
    selectedProjectId = null;
    selectedDate = null;
    
    loadTasks();
    document.getElementById('filter-panel').style.display = 'none';
    if (currentView === 'tasks') renderTasks();
}

async function applyTagFilter(value) {
    currentFilters.tag_id = value || null;
    await loadTasks();
    if (currentView === 'tasks') renderTasks();
}

async function applyStatusFilter(value) {
    currentFilters.status = value || null;
    await loadTasks();
    if (currentView === 'tasks') renderTasks();
}

async function applyPriorityFilter(value) {
    currentFilters.priority = value || null;
    await loadTasks();
    if (currentView === 'tasks') renderTasks();
}

function clearMainFilters() {
    document.getElementById('main-filter-tag').value = '';
    document.getElementById('main-filter-status').value = '';
    document.getElementById('main-filter-priority').value = '';
    
    currentFilters.tag_id = null;
    currentFilters.status = null;
    currentFilters.priority = null;
    
    loadTasks().then(function() {
        if (currentView === 'tasks') renderTasks();
    });
}

async function toggleTask(taskId, currentStatus) {
    var newStatus = currentStatus === 'completed' ? 'active' : 'completed';
    await api('/tasks/' + taskId, 'PUT', { status: newStatus });
    await loadTasks();
    if (currentView === 'tasks') renderTasks();
    renderCalendar();
}

async function deleteTask(taskId) {
    if (!confirm(t('deleteConfirm'))) return;
    await api('/tasks/' + taskId, 'DELETE');
    await loadTasks();
    if (currentView === 'tasks') renderTasks();
    renderCalendar();
}

function closeTaskModal() {
    var modal = document.getElementById('task-modal');
    if (modal) modal.style.display = 'none';
}

async function createTask() {
    var title = document.getElementById('task-title').value;
    if (!title) return alert(t('enterTaskName'));
    
    var dueDateInput = document.getElementById('task-due').value;
    var taskTime = document.getElementById('task-time').value;
    var projectId = document.getElementById('task-project').value;
    var assigneeId = document.getElementById('task-assignee').value;
    
    var dueDate = null;
    if (dueDateInput) {
        var parts = dueDateInput.split('.');
        if (parts.length === 3) {
            dueDate = parts[2] + '-' + parts[1] + '-' + parts[0];
        } else {
            dueDate = dueDateInput;
        }
    }
    
    var task = {
        title: title,
        description: document.getElementById('task-desc').value,
        due_date: dueDate,
        priority: document.getElementById('task-priority').value,
        project_id: projectId ? parseInt(projectId) : null,
        tag_id: document.getElementById('task-tag').value || null,
        task_time: taskTime || null,
        assigned_to: assigneeId ? parseInt(assigneeId) : null
    };

    var result = await api('/tasks', 'POST', task);
    if (result) {
        closeTaskModal();
        await loadTasks();
        if (currentView === 'tasks') renderTasks();
        renderCalendar();
    } else {
        alert('Ошибка при создании задачи');
    }
}

async function editTask(taskId) {
    var task = null;
    for (var i = 0; i < tasks.length; i++) {
        if (tasks[i].id === taskId) {
            task = tasks[i];
            break;
        }
    }
    if (!task) return;
    
    showTaskModal(null, task.project_id);
    
    document.querySelector('#task-modal h3').textContent = '✏️ ' + t('edit');
    document.getElementById('task-title').value = task.title;
    document.getElementById('task-desc').value = task.description || '';
    document.getElementById('task-due').value = task.due_date ? formatDate(task.due_date) : '';
    
    var timeInput = document.getElementById('task-time');
    if (timeInput && task.task_time) {
        timeInput.value = task.task_time.toString().substring(0, 5);
    } else if (timeInput) {
        timeInput.value = '';
    }
    
    document.getElementById('task-priority').value = task.priority;
    
    if (task.project_id) {
        var projectSelect = document.getElementById('task-project');
        if (projectSelect) projectSelect.value = task.project_id;
        await loadTeamMembersForTask(task.project_id);
        var assigneeSelect = document.getElementById('task-assignee');
        if (assigneeSelect && task.assigned_to) {
            assigneeSelect.value = task.assigned_to;
        }
    }
    document.getElementById('task-tag').value = task.tag_id || '';
    
    var btn = document.querySelector('#task-modal .submit-btn');
    if (btn) {
        btn.textContent = t('update');
        btn.onclick = async function() {
            var updated = {
                title: document.getElementById('task-title').value,
                description: document.getElementById('task-desc').value,
                due_date: parseDateToISO(document.getElementById('task-due').value),
                priority: document.getElementById('task-priority').value,
                tag_id: document.getElementById('task-tag').value || null
            };
            await api('/tasks/' + taskId, 'PUT', updated);
            closeTaskModal();
            await loadTasks();
            if (currentView === 'tasks') renderTasks();
            renderCalendar();
            btn.textContent = t('createTask');
            btn.onclick = createTask;
            document.querySelector('#task-modal h3').textContent = t('taskModalTitle');
        };
    }
}

function showProjectModal() {
    document.getElementById('project-modal').style.display = 'flex';
    document.getElementById('project-name').value = '';
    document.getElementById('project-desc').value = '';

    var typeContainer = document.getElementById('project-type-container');
    var teamContainer = document.getElementById('project-team-container');
    var freelancerFields = document.getElementById('project-freelancer-fields');
    var warningDiv = document.getElementById('project-team-warning');
    var projectTypeSelect = document.getElementById('project-type');

    if (currentUserType === 1) {
        if (typeContainer) typeContainer.style.display = 'block';
        if (freelancerFields) freelancerFields.style.display = 'none';
        
        function toggleTeamField() {
            var isTeam = projectTypeSelect.value === 'team';
            if (teamContainer) {
                teamContainer.style.display = isTeam ? 'block' : 'none';
            }
            if (warningDiv) {
                if (isTeam && teams.length === 0) {
                    warningDiv.innerHTML = '⚠️ У вас нет команд. При создании командного проекта сначала будет создана команда.';
                    warningDiv.style.display = 'block';
                } else {
                    warningDiv.style.display = 'none';
                }
            }
        }
        
        projectTypeSelect.removeEventListener('change', toggleTeamField);
        projectTypeSelect.addEventListener('change', toggleTeamField);
        toggleTeamField();
        
        if (teams.length > 0) {
            loadUserTeams();
        }
        
    } else {
        if (typeContainer) typeContainer.style.display = 'none';
        if (teamContainer) teamContainer.style.display = 'none';
        if (freelancerFields) freelancerFields.style.display = 'block';
        updateCategorySelects();
        updateClientSelects();
    }
}

function showQuickTeamModal() {
    document.getElementById('quick-team-modal').style.display = 'flex';
    document.getElementById('quick-team-name').value = '';
    document.getElementById('quick-team-desc').value = '';
}

function closeQuickTeamModal() {
    document.getElementById('quick-team-modal').style.display = 'none';
    pendingProjectData = null;
}

async function createQuickTeamAndProject() {
    var teamName = document.getElementById('quick-team-name').value.trim();
    if (!teamName) {
        alert('Введите название команды');
        return;
    }
    
    var teamDesc = document.getElementById('quick-team-desc').value;
    
    var newTeam = await api('/teams', 'POST', {
        team_name: teamName,
        description: teamDesc
    });
    
    if (newTeam && newTeam.team_id) {
        closeQuickTeamModal();
        
        if (pendingProjectData) {
            var projectToSend = {
                name: pendingProjectData.name,
                description: pendingProjectData.description,
                type: 'team',
                team_id: newTeam.team_id
            };
            
            var result = await api('/projects', 'POST', projectToSend);
            if (result) {
                closeProjectModal();
                await loadProjects();
                await loadTeams();
                updateProjectSelects();
                updateProjectTeamSelect();
                if (currentView === 'projects') renderAllProjects();
                if (currentView === 'teams') renderTeamsList();
                alert('Команда и проект успешно созданы!');
            } else {
                alert('Проект не создан');
            }
            pendingProjectData = null;
        }
    } else {
        alert('Не удалось создать команду');
    }
}

async function loadUserTeams() {
    var data = await api('/teams');
    var teamSelect = document.getElementById('project-team');
    if (teamSelect) {
        if (data && data.length > 0) {
            var html = '';
            for (var i = 0; i < data.length; i++) {
                html += '<option value="' + data[i].team_id + '">' + escapeHtml(data[i].team_name) + '</option>';
            }
            teamSelect.innerHTML = html;
        }
    }
}

function closeProjectModal() {
    document.getElementById('project-modal').style.display = 'none';
}

let pendingProjectData = null;

async function createProject() {
    var name = document.getElementById('project-name').value.trim();
    if (!name) return alert(t('enterProjectName'));

    var project = {
        name: name,
        description: document.getElementById('project-desc').value
    };

    if (currentUserType === 1) {
        var projectType = document.getElementById('project-type').value;
        
        if (projectType === 'team') {
            var teamId = document.getElementById('project-team').value;
            
            if (!teamId || teamId === '') {
                pendingProjectData = {
                    name: name,
                    description: document.getElementById('project-desc').value
                };
                showQuickTeamModal();
                return;
            }
            project.type = 'team';
            project.team_id = parseInt(teamId);
        } else {
            project.type = 'personal';
        }
    } else {
        project.type = 'personal';
    }

    var result = await api('/projects', 'POST', project);
    if (result) {
        closeProjectModal();
        await loadProjects();
        await loadTeams();
        updateProjectSelects();
        updateProjectTeamSelect();
        if (currentView === 'projects') renderAllProjects();
        if (currentView === 'teams') renderTeamsList();
        renderProjectsList();
    }
}

async function deleteProject(projectId) {
    if (!confirm(t('deleteProjectConfirm'))) return;
    await api('/projects/' + projectId, 'DELETE');
    await loadProjects();
    await loadTasks();
    if (currentView === 'projects') renderAllProjects();
    renderCalendar();
}

function showClientModal(clientId) {
    document.getElementById('client-modal').style.display = 'flex';
    
    if (clientId) {
        var client = null;
        for (var i = 0; i < clients.length; i++) {
            if (clients[i].id === clientId) {
                client = clients[i];
                break;
            }
        }
        if (client) {
            document.getElementById('client-name').value = client.name;
            document.getElementById('client-contacts').value = client.contacts;
            document.getElementById('client-additional').value = client.additional || '';
            document.getElementById('clientSubmitBtn').textContent = t('save');
            document.getElementById('clientSubmitBtn').onclick = function() { updateClient(clientId); };
        }
    } else {
        document.getElementById('client-name').value = '';
        document.getElementById('client-contacts').value = '';
        document.getElementById('client-additional').value = '';
        document.getElementById('clientSubmitBtn').textContent = t('create');
        document.getElementById('clientSubmitBtn').onclick = createClient;
    }
}

function closeClientModal() {
    document.getElementById('client-modal').style.display = 'none';
}

function editClient(clientId) {
    showClientModal(clientId);
}

async function createClient() {
    var name = document.getElementById('client-name').value;
    var contacts = document.getElementById('client-contacts').value;
    if (!name || !contacts) return alert(t('fillAllFields'));
    
    await api('/clients', 'POST', {
        name: name,
        contacts: contacts,
        additional: document.getElementById('client-additional').value
    });
    closeClientModal();
    await loadClients();
    if (currentView === 'clients') showAllClients();
}

async function updateClient(clientId) {
    var name = document.getElementById('client-name').value;
    var contacts = document.getElementById('client-contacts').value;
    if (!name || !contacts) return alert(t('fillAllFields'));
    
    await api('/clients/' + clientId, 'PUT', {
        name: name,
        contacts: contacts,
        additional: document.getElementById('client-additional').value
    });
    closeClientModal();
    await loadClients();
    if (currentView === 'clients') showAllClients();
}

async function deleteClient(clientId) {
    if (!confirm(t('deleteClientConfirm'))) return;
    await api('/clients/' + clientId, 'DELETE');
    await loadClients();
    if (currentView === 'clients') showAllClients();
}

function showQuickCategoryModal() {
    document.getElementById('quick-category-modal').style.display = 'flex';
}

function closeQuickCategoryModal() {
    document.getElementById('quick-category-modal').style.display = 'none';
}

async function createQuickCategory() {
    var name = document.getElementById('quick-category-name').value;
    if (!name) return;
    await api('/categories', 'POST', { name: name });
    await loadCategories();
    closeQuickCategoryModal();
}

function showQuickTagModal() {
    document.getElementById('quick-tag-modal').style.display = 'flex';
}

function closeQuickTagModal() {
    document.getElementById('quick-tag-modal').style.display = 'none';
}

async function createQuickTag() {
    var name = document.getElementById('quick-tag-name').value;
    if (!name) return;
    await api('/tags', 'POST', { name: name });
    await loadTags();
    closeQuickTagModal();
}

function renderCalendar() {
    var calendarDays = document.getElementById('calendar-days');
    var monthYear = document.getElementById('calendarMonthYear');
    if (!calendarDays) return;
    
    var year = currentDate.getFullYear();
    var month = currentDate.getMonth();
    
    var firstDay = new Date(year, month, 1);
    var startWeekday = (firstDay.getDay() + 6) % 7;
    var daysInMonth = new Date(year, month + 1, 0).getDate();
    
    var monthNames = currentLang === 'en'
        ? ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
        : ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'];
    monthYear.textContent = monthNames[month] + ' ' + year;
    
    calendarDays.innerHTML = '';
    
    for (var i = 0; i < startWeekday; i++) {
        var empty = document.createElement('div');
        empty.className = 'calendar-empty';
        calendarDays.appendChild(empty);
    }
    
    var today = new Date();
    today.setHours(0, 0, 0, 0);
    
    for (var day = 1; day <= daysInMonth; day++) {
        var dayDiv = document.createElement('div');
        dayDiv.textContent = day;
        
        var dateStr = year + '-' + String(month + 1).padStart(2, '0') + '-' + String(day).padStart(2, '0');
        var hasTasks = false;
        for (var j = 0; j < tasks.length; j++) {
            if (tasks[j].due_date === dateStr) {
                hasTasks = true;
                break;
            }
        }
        
        if (hasTasks) dayDiv.classList.add('has-tasks');
        
        var currentDateObj = new Date(year, month, day);
        if (currentDateObj.toDateString() === today.toDateString()) {
            dayDiv.classList.add('today');
        }
        
        (function(date) {
            dayDiv.addEventListener('click', function(e) {
                e.stopPropagation();
                selectDate(date);
            });
        })(dateStr);
        
        calendarDays.appendChild(dayDiv);
    }
}

function prevMonth() {
    currentDate.setMonth(currentDate.getMonth() - 1);
    renderCalendar();
}

function nextMonth() {
    currentDate.setMonth(currentDate.getMonth() + 1);
    renderCalendar();
}

async function showReports() {
    currentView = 'reports';
    await loadReports();
    renderReports();
}

async function renderReports() {
    var container = document.getElementById('main-container');
    if (!container) return;
    
    container.innerHTML = `
        <div class="reports-header" style="display:flex;justify-content:space-between;align-items:center;margin-bottom:24px;">
            <h2>📄 ${t('reportsMenu')}</h2>
            <button class="new-report-btn" onclick="showReportModal()" style="padding:10px 20px;background:#1d1d1f;color:white;border:none;border-radius:8px;cursor:pointer;">+ ${t('newReport')}</button>
        </div>
        <div id="all-reports-list" class="all-reports-list"></div>
    `;
    
    var listContainer = document.getElementById('all-reports-list');
    if (!listContainer) return;
    
    if (!reports || reports.length === 0) {
        listContainer.innerHTML = '<div class="empty-state" style="text-align:center;padding:40px;color:#86868b;">✨ ' + t('noReports') + '</div>';
        return;
    }
    
    var html = '';
    for (var i = 0; i < reports.length; i++) {
        var r = reports[i];
        var typeText = '';
        if (r.report_type === 'project') typeText = '📁 Проект';
        else if (r.report_type === 'client') typeText = '👥 Клиент';
        else if (r.report_type === 'team') typeText = '👥 Команда';
        
        html += `
            <div class="report-card" style="background:white;border-radius:12px;padding:16px;margin-bottom:12px;border:1px solid #e8e8ed;">
                <div style="display:flex;justify-content:space-between;align-items:center;">
                    <div style="display:flex;align-items:center;gap:12px;">
                        <span style="font-size:24px;">📄</span>
                        <div>
                            <h3 style="margin:0 0 4px 0;">${escapeHtml(r.report_name)}</h3>
                            <div style="font-size:12px;color:#86868b;">${typeText} • ${formatDate(r.period_start)} — ${formatDate(r.period_end)}</div>
                            <div style="font-size:11px;color:#aaa;margin-top:4px;">Создан: ${formatDateTime(r.created_at)}</div>
                        </div>
                    </div>
                    <div style="display:flex;gap:8px;">
                        <button onclick="downloadReport(${r.id})" style="padding:6px 12px;background:#1d1d1f;color:white;border:none;border-radius:6px;cursor:pointer;">📥 Скачать</button>
                        <button onclick="deleteReport(${r.id})" style="padding:6px 12px;background:#fff;color:#e91e63;border:1px solid #e91e63;border-radius:6px;cursor:pointer;">🗑️ Удалить</button>
                    </div>
                </div>
            </div>
        `;
    }
    listContainer.innerHTML = html;
}

function downloadReport(reportId) {
    var token = getToken();
    if (!token) {
        alert('Ошибка авторизации');
        return;
    }
    
    fetch('/api/reports/' + reportId + '/download', {
        headers: { 'Authorization': 'Bearer ' + token }
    })
    .then(function(response) {
        if (!response.ok) {
            throw new Error('Ошибка ' + response.status);
        }
        return response.blob();
    })
    .then(function(blob) {
        var url = window.URL.createObjectURL(blob);
        var a = document.createElement('a');
        a.href = url;
        a.download = 'report_' + reportId + '.xlsx';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
    })
    .catch(function(error) {
        console.error('Download error:', error);
        alert('Ошибка при скачивании: ' + error.message);
    });
}

function showReportModal() {
    if (currentUserType === 1) {
        let clientOption = document.querySelector('#report-type option[value="client"]');
        if (clientOption) {
            clientOption.style.display = 'none';
        }
        let reportType = document.getElementById('report-type');
        if (reportType && reportType.value === 'client') {
            reportType.value = 'project';
        }
    } else {
        let clientOption = document.querySelector('#report-type option[value="client"]');
        if (clientOption) {
            clientOption.style.display = 'block';
        }
    }
    
    document.getElementById('report-modal').style.display = 'flex';
    updateReportTargetSelect();
}

function toggleReportTarget() {
    updateReportTargetSelect();
}

function closeReportModal() {
    document.getElementById('report-modal').style.display = 'none';
}

async function createReport() {
    var reportName = document.getElementById('report-name').value.trim();
    var periodStart = document.getElementById('report-start').value;
    var periodEnd = document.getElementById('report-end').value;
    var reportType = document.getElementById('report-type').value;
    var targetId = document.getElementById('report-target').value;
    
    if (!reportName) {
        alert('Введите название отчёта');
        return;
    }
    if (!periodStart || !periodEnd) {
        alert('Выберите период');
        return;
    }
    if (!targetId) {
        alert('Выберите цель отчёта');
        return;
    }
    
    var result = await api('/reports', 'POST', {
        report_name: reportName,
        period_start: periodStart,
        period_end: periodEnd,
        report_type: reportType,
        target_id: parseInt(targetId)
    });
    
    if (result) {
        closeReportModal();
        downloadReport(result.id);
        await loadReports();
        if (currentView === 'reports') {
            renderReports();
        }
        alert('Отчёт создан и скачан!');
    }
}

async function deleteReport(reportId) {
    if (!confirm('Удалить отчёт?')) return;
    
    var result = await api('/reports/' + reportId, 'DELETE');
    if (result) {
        await loadReports();
        if (currentView === 'reports') {
            renderReports();
        }
        alert('Отчёт удалён');
    }
}

function setupSearch() {
    var searchInput = document.getElementById('search-input');
    if (searchInput) {
        searchInput.addEventListener('input', async function(e) {
            currentFilters.search = e.target.value;
            if (currentView !== 'tasks') {
                currentView = 'tasks';
                selectedProjectId = null;
                selectedDate = null;
            }
            await loadTasks();
            if (currentView === 'tasks') renderTasks();
        });
    }
}

async function checkAuth() {
    var t = getToken();
    if (!t) {
        window.location.href = '/login.html';
        return;
    }
    var user = await api('/profile');
    if (user) {
        currentUser = user;
        currentUserType = user.user_type;
        var avatar = document.getElementById('avatar');
        if (avatar) avatar.textContent = user.username.charAt(0).toUpperCase();
        setupMenuByUserType();
        await loadCategories();
        await loadProjects();
        await loadTags();
        await loadClients();
        await loadTasks();
        await loadTeams();
        await loadNotifications();
        renderCalendar();
        showWelcome();
        setupSearch();
        startNotificationPolling();
    } else {
        window.location.href = '/login.html';
    }
}

async function loginUser() {
    var email = document.getElementById('login-email').value;
    var password = document.getElementById('login-password').value;
    var messageEl = document.getElementById('login-message');
    
    if (!email || !password) {
        if (messageEl) messageEl.innerHTML = '❌ ' + t('fillAllFields');
        return;
    }
    
    try {
        var res = await fetch('/api/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: email, password: password })
        });
        var data = await res.json();
        
        if (res.ok) {
            localStorage.setItem('access_token', data.access_token);
            window.location.href = '/';
        } else {
            if (messageEl) messageEl.innerHTML = '❌ ' + (data.detail || t('loginError'));
        }
    } catch(e) {
        if (messageEl) messageEl.innerHTML = '❌ ' + t('connectionError');
    }
}

async function registerUser() {
    var username = document.getElementById('reg-username').value;
    var email = document.getElementById('reg-email').value;
    var password = document.getElementById('reg-password').value;
    var confirm = document.getElementById('reg-confirm').value;
    var userTypeRadio = document.querySelector('input[name="user-type"]:checked');
    var userType = userTypeRadio ? parseInt(userTypeRadio.value) : 1;
    var messageEl = document.getElementById('reg-message');
    
    if (!username || !email || !password || !confirm) {
        if (messageEl) messageEl.innerHTML = '❌ ' + t('fillAllFields');
        return;
    }
    
    if (password !== confirm) {
        if (messageEl) messageEl.innerHTML = '❌ ' + t('passwordsMismatch');
        return;
    }
    
    if (password.length < 6) {
        if (messageEl) messageEl.innerHTML = '❌ ' + t('passwordTooShort');
        return;
    }
    
    try {
        var res = await fetch('/api/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username: username, email: email, password: password, user_type: userType })
        });
        
        if (res.ok) {
            window.location.href = '/login.html';
        } else {
            var data = await res.json();
            if (messageEl) messageEl.innerHTML = '❌ ' + (data.detail || t('registrationError'));
        }
    } catch(e) {
        if (messageEl) messageEl.innerHTML = '❌ ' + t('connectionError');
    }
}

function logout() {
    if (notificationCheckInterval) clearInterval(notificationCheckInterval);
    localStorage.removeItem('access_token');
    window.location.href = '/login.html';
}

function showAllTeams() {
    currentView = 'teams';
    var container = document.getElementById('main-container');
    container.innerHTML = '<div class="teams-header" style="display:flex;justify-content:space-between;align-items:center;margin-bottom:24px;"><h2>👥 ' + t('myTeams') + '</h2><button class="new-team-btn" onclick="showTeamModal()">+ ' + t('newTeam') + '</button></div><div id="all-teams-list" class="all-teams-list"></div>';
    renderTeamsList();
}

function renderTeamsList() {
    var container = document.getElementById('all-teams-list');
    if (!container) return;
    if (teams.length === 0) {
        container.innerHTML = '<div class="empty-state">✨ ' + t('noTeams') + '</div>';
        return;
    }
    var html = '';
    for (var i = 0; i < teams.length; i++) {
        var t = teams[i];
        html += '<div class="team-card" onclick="openTeamMembers(' + t.team_id + ')"><div class="team-card-header"><span>👥</span><h3>' + escapeHtml(t.team_name) + '</h3><button class="delete-btn" onclick="event.stopPropagation(); deleteTeam(' + t.team_id + ')">🗑️</button></div><p>' + escapeHtml(t.description || '') + '</p></div>';
    }
    container.innerHTML = html;
}

function showTeamModal(teamId) {
    var modal = document.getElementById('team-modal');
    if (modal) modal.style.display = 'flex';
    if (teamId) {
        var team = null;
        for (var i = 0; i < teams.length; i++) {
            if (teams[i].team_id === teamId) {
                team = teams[i];
                break;
            }
        }
        if (team) {
            document.getElementById('team-name').value = team.team_name;
            document.getElementById('team-desc').value = team.description || '';
            document.querySelector('#team-modal .submit-btn').textContent = t('save');
            document.querySelector('#team-modal .submit-btn').onclick = function() { updateTeam(teamId); };
        }
    } else {
        document.getElementById('team-name').value = '';
        document.getElementById('team-desc').value = '';
        document.querySelector('#team-modal .submit-btn').textContent = t('create');
        document.querySelector('#team-modal .submit-btn').onclick = createTeam;
    }
}

function closeTeamModal() {
    document.getElementById('team-modal').style.display = 'none';
}

async function createTeam() {
    var name = document.getElementById('team-name').value.trim();
    if (!name) return alert(t('enterTeamName'));
    
    var result = await api('/teams', 'POST', {
        team_name: name,
        description: document.getElementById('team-desc').value
    });
    
    if (result) {
        closeTeamModal();
        await loadTeams();
        if (currentView === 'teams') showAllTeams();
        openTeamMembers(result.team_id);
    }
}

async function updateTeam(teamId) {
    var name = document.getElementById('team-name').value.trim();
    if (!name) return alert(t('enterTeamName'));
    await api('/teams/' + teamId, 'PUT', { team_name: name, description: document.getElementById('team-desc').value });
    closeTeamModal();
    await loadTeams();
    if (currentView === 'teams') showAllTeams();
}

async function deleteTeam(teamId) {
    if (!confirm(t('deleteTeamConfirm'))) return;
    await api('/teams/' + teamId, 'DELETE');
    await loadTeams();
    if (currentView === 'teams') showAllTeams();
    updateProjectTeamSelect();
}

async function openTeamMembers(teamId) {
    currentTeamId = teamId;
    document.getElementById('team-members-modal').style.display = 'flex';
    document.getElementById('invite-email').value = '';
    document.getElementById('search-results').style.display = 'none';
    document.getElementById('search-results').innerHTML = '';
    clearSelectedUserForInvite();
    await loadTeamMembers(teamId);
    await loadTeamInvites(teamId);
    await loadTeamProjects(teamId);
    
    var select = document.getElementById('add-project-select');
    if (select) {
        var html = '';
        for (var i = 0; i < projects.length; i++) {
            html += '<option value="' + projects[i].id + '">' + escapeHtml(projects[i].name) + '</option>';
        }
        select.innerHTML = html;
    }
}

function closeTeamMembersModal() {
    document.getElementById('team-members-modal').style.display = 'none';
}

async function loadTeamMembers(teamId) {
    var data = await api('/teams/' + teamId + '/members');
    var container = document.getElementById('team-members-list');
    if (!container) return;
    if (!data || data.length === 0) {
        container.innerHTML = '<p style="color:#86868b;">' + t('noMembers') + '</p>';
        return;
    }
    var html = '';
    for (var i = 0; i < data.length; i++) {
        var m = data[i];
        html += '<div class="member-item"><span>' + escapeHtml(m.username) + ' (' + (m.role === 'manager' ? 'менеджер' : 'участник') + ')</span>';
        if (m.role !== 'manager') {
            html += '<button onclick="removeMember(' + teamId + ', ' + m.user_id + ')">❌</button>';
        }
        html += '</div>';
    }
    container.innerHTML = html;
}

async function loadTeamInvites(teamId) {
    var data = await api('/teams/' + teamId + '/pending-invites');
    var container = document.getElementById('team-invited-list');
    if (!container) return;
    if (!data || data.length === 0) {
        container.innerHTML = '<p style="color:#86868b;">' + t('noInvites') + '</p>';
        return;
    }
    var html = '';
    for (var i = 0; i < data.length; i++) {
        html += '<div class="member-item"><span>📨 ' + escapeHtml(data[i].username) + ' (' + escapeHtml(data[i].email) + ')</span></div>';
    }
    container.innerHTML = html;
}

async function loadTeamProjects(teamId) {
    var data = await api('/teams/' + teamId + '/projects');
    var container = document.getElementById('team-projects-list');
    if (!container) return;
    if (!data || data.length === 0) {
        container.innerHTML = '<p style="color:#86868b;">' + t('noTeamProjects') + '</p>';
        return;
    }
    var html = '';
    for (var i = 0; i < data.length; i++) {
        html += '<div class="member-item"><span>📁 ' + escapeHtml(data[i].project_name) + '</span><button onclick="removeProjectFromTeam(' + teamId + ', ' + data[i].project_id + ')">❌</button></div>';
    }
    container.innerHTML = html;
}

let selectedUserForInvite = null;

async function searchUsers() {
    var query = document.getElementById('invite-email').value.trim();
    var resultsDiv = document.getElementById('search-results');
    var inviteBtn = document.getElementById('inviteMemberBtn');
    
    if (query.length < 2) {
        resultsDiv.style.display = 'none';
        resultsDiv.innerHTML = '';
        if (inviteBtn) {
            inviteBtn.disabled = true;
            inviteBtn.style.background = '#ccc';
        }
        selectedUserForInvite = null;
        return;
    }
    
    var users = await api('/users/search?q=' + encodeURIComponent(query));
    
    if (!users || users.length === 0) {
        resultsDiv.style.display = 'block';
        resultsDiv.innerHTML = '<div style="padding:16px;text-align:center;color:#86868b;">Пользователь не найден</div>';
        return;
    }
    
    var html = '';
    for (var i = 0; i < users.length; i++) {
        var u = users[i];
        html += '<div class="search-result-item" onclick="selectUserForInvite(' + u.id + ', \'' + escapeHtml(u.username) + '\', \'' + escapeHtml(u.email) + '\')" style="padding:12px 16px;cursor:pointer;border-bottom:1px solid #f0f0f0;"><div style="font-weight:500;">' + escapeHtml(u.username) + '</div><div style="font-size:12px;color:#86868b;">' + escapeHtml(u.email) + '</div></div>';
    }
    resultsDiv.style.display = 'block';
    resultsDiv.innerHTML = html;
}

function selectUserForInvite(id, username, email) {
    selectedUserForInvite = { id: id, username: username, email: email };
    
    var inviteBtn = document.getElementById('inviteMemberBtn');
    if (inviteBtn) {
        inviteBtn.disabled = false;
        inviteBtn.style.background = '#1d1d1f';
        inviteBtn.textContent = 'Пригласить ' + username;
    }
}

function clearSelectedUserForInvite() {
    selectedUserForInvite = null;
    var inviteBtn = document.getElementById('inviteMemberBtn');
    if (inviteBtn) {
        inviteBtn.disabled = true;
        inviteBtn.style.background = '#ccc';
        inviteBtn.textContent = 'Пригласить';
    }
}

async function inviteMember() {
    if (!selectedUserForInvite) {
        alert('Сначала найдите и выберите пользователя');
        return;
    }
    
    var result = await api('/teams/' + currentTeamId + '/invite?user_id=' + selectedUserForInvite.id, 'POST');
    if (result) {
        alert('Приглашение отправлено!');
        clearSelectedUserForInvite();
        await loadTeamInvites(currentTeamId);
    }
}

async function removeMember(teamId, userId) {
    if (!confirm(t('removeMemberConfirm'))) return;
    await api('/teams/' + teamId + '/members/' + userId, 'DELETE');
    await loadTeamMembers(teamId);
}

async function addProjectToTeam() {
    var projectId = document.getElementById('add-project-select').value;
    if (!projectId) return;
    
    var project = null;
    for (var i = 0; i < projects.length; i++) {
        if (projects[i].id == projectId) {
            project = projects[i];
            break;
        }
    }
    var isPersonal = project && project.type === 'personal';
    
    if (isPersonal) {
        if (!confirm(t('projectWillBecomeShared'))) return;
        var result = await api('/teams/' + currentTeamId + '/add-existing-project?project_id=' + projectId, 'POST');
        if (result) {
            await loadTeamProjects(currentTeamId);
            await loadProjects();
            renderProjectsList();
            alert(t('projectAddedToTeam'));
        }
    } else {
        var result = await api('/teams/' + currentTeamId + '/projects', 'POST', { project_id: parseInt(projectId) });
        if (result) await loadTeamProjects(currentTeamId);
    }
}

async function removeProjectFromTeam(teamId, projectId) {
    if (!confirm(t('removeProjectConfirm'))) return;
    await api('/teams/' + teamId + '/projects/' + projectId, 'DELETE');
    await loadTeamProjects(teamId);
}

async function switchLanguage(lang) {
    localStorage.setItem('language', lang);
    await api('/profile', 'PUT', { language: lang });
    location.reload();
}

applyLanguage();

document.addEventListener('DOMContentLoaded', function() {
    var dateInputs = document.querySelectorAll('.date-input');
    for (var i = 0; i < dateInputs.length; i++) {
        dateInputs[i].addEventListener('input', function(e) {
            formatDateInput(e.target);
        });
    }
});

if (document.getElementById('avatar')) {
    checkAuth();
}