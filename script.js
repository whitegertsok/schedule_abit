// Проверка и загрузка расписания из Local Storage
const savedSchedule = localStorage.getItem('schedule');
const schedule = savedSchedule ? JSON.parse(savedSchedule) : {
    monday: [
        { time: "12:30-14:00", subject: "Экономика и управление", teacher: "Лариса Викторовна Клачева" },
        { time: "14:10-15:40", subject: "Экономика и управление", teacher: "Лариса Викторовна Клачева" }
    ],
    tuesday: [
        { time: "9:00-10:30", subject: "Основы программирования", teacher: "Андрей Станиславович Петрань" },
        { time: "10:40-12:10", subject: "3Д-моделирование", teacher: "Радионов Никита Евгеньевич" }
    ],
    wednesday: [
        { time: "14:10-15:40", subject: "Математика: Алгебра и начала математического анализа", teacher: "Лысова Юлия Николаевна" }
    ],
    thursday: [
        { time: "12:30-14:00", subject: "Технические средства информатизации", teacher: "Морозов Александр Павлович" },
        { time: "14:10-15:40", subject: "Операционные системы", teacher: "Морозов Александр Павлович" },
        { time: "16:00-17:30", subject: "Иностранный язык в профессиональной деятельности", teacher: "Андрей Станиславович Петрань" }
    ],
    friday: [
        { time: "9:00-10:30", subject: "Информатика", teacher: "Должкевич Евгений Александрович" },
        { time: "10:40-12:10", subject: "Основы информационной безопасности", teacher: "Должкевич Евгений Александрович" },
        { time: "12:30-14:00", subject: "История", teacher: "Алла Николаевна Петрань" },
        { time: "14:10-15:40", subject: "Основы финансовой грамотности", teacher: "Ирина Игоревна Тихомирова" }
    ]
};

// Сохранение расписания в Local Storage
function saveSchedule() {
    localStorage.setItem('schedule', JSON.stringify(schedule));
}

// Загружает расписание для студентов при выборе дня
document.querySelectorAll('.day-btn').forEach(button => {
    button.addEventListener('click', function() {
        const day = this.getAttribute('data-day');
        const lessons = schedule[day];
        let output = `<h4>Расписание на ${this.textContent}:</h4>`;

        lessons.forEach(lesson => {
            output += `<p>${lesson.time} - предмет: ${lesson.subject}. Преподаватель: ${lesson.teacher}</p>`;
        });

        document.getElementById('schedule').innerHTML = output;
    });
});

// Обработчик добавления пары
document.getElementById('add-lesson-btn').addEventListener('click', function() {
    const day = document.getElementById('edit-day-select').value;
    const subject = document.getElementById('new-subject').value;
    const time = document.getElementById('new-time').value;
    const teacher = document.getElementById('new-teacher').value;

    schedule[day].push({ time: time, subject: subject, teacher: teacher });
    saveSchedule();  // Сохраняем расписание
    displayTeacherSchedule();
});

// Обработчик удаления пары
document.getElementById('remove-lesson-btn').addEventListener('click', function() {
    const day = document.getElementById('edit-day-select').value;
    const time = document.getElementById('remove-time').value;

    schedule[day] = schedule[day].filter(lesson => lesson.time !== time);
    saveSchedule();  // Сохраняем расписание
    displayTeacherSchedule();
});

// Отображение текущего расписания для учителей
function displayTeacherSchedule() {
    const daySelect = document.getElementById('edit-day-select').value;
    const lessons = schedule[daySelect];
    let output = `<h4>Расписание на ${daySelect.charAt(0).toUpperCase() + daySelect.slice(1)}:</h4>`;

    lessons.forEach(lesson => {
        output += `<p>${lesson.time} - предмет: ${lesson.subject}. Преподаватель: ${lesson.teacher}</p>`;
    });

    document.getElementById('teacher-schedule').innerHTML = output;
}

// Обработчик регистрации
document.getElementById('register-btn').addEventListener('click', function() {
    const userType = document.getElementById('user-type').value;

    if (userType === 'student') {
        document.getElementById('student-container').style.display = 'block';
        document.getElementById('teacher-container').style.display = 'none';
        document.getElementById('teacher-code-container').style.display = 'none';
    } else {
        document.getElementById('teacher-code-container').style.display = 'block';
        const accessCode = document.getElementById('teacher-code').value;

        // Проверка кода доступа
        if (accessCode === "Abit25") {
            document.getElementById('teacher-container').style.display = 'block';
            document.getElementById('student-container').style.display = 'none';
            displayTeacherSchedule();
        } else {
            alert("Неверный код доступа!");
            document.getElementById('teacher-container').style.display = 'none';
        }
    }
});