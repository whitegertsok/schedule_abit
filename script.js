document.addEventListener('DOMContentLoaded', () => {
    const roleSelect = document.getElementById('role-select');
    const studentContainer = document.getElementById('student-container');
    const teacherContainer = document.getElementById('teacher-container');
    const createGroupBtn = document.getElementById('create-group-btn');
    const editGroupSelect = document.getElementById('edit-group-select');
    const newGroupNameInput = document.getElementById('new-group-name');
    const addLessonBtn = document.getElementById('add-lesson-btn');
    const removeLessonBtn = document.getElementById('remove-lesson-btn');
    const scheduleDisplay = document.getElementById('schedule-display');
    const studentGroupSelect = document.getElementById('student-group-select');
    let schedule = {
        "IT-25": {
            monday: [],
            tuesday: [],
            wednesday: [],
            thursday: [],
            friday: []
        }
    };

    const refreshGroupLists = () => {
        const groups = Object.keys(schedule);
        editGroupSelect.innerHTML = '';
        studentGroupSelect.innerHTML = '';
        groups.forEach(group => {
            const option1 = document.createElement('option');
            const option2 = document.createElement('option');
            option1.value = option2.value = group;
            option1.textContent = option2.textContent = group;
            editGroupSelect.appendChild(option1);
            studentGroupSelect.appendChild(option2);
        });
    };

    roleSelect.addEventListener('change', () => {
        if (roleSelect.value === 'Студент') {
            studentContainer.style.display = 'block';
            teacherContainer.style.display = 'none';
            showSchedule(studentGroupSelect.value);
        } else if (roleSelect.value === 'Преподаватель') {
            teacherContainer.style.display = 'block';
            studentContainer.style.display = 'none';
        } else {
            studentContainer.style.display = 'none';
            teacherContainer.style.display = 'none';
        }
    });

    createGroupBtn.addEventListener('click', () => {
        const groupName = newGroupNameInput.value.trim();
        if (groupName && !schedule[groupName]) {
            schedule[groupName] = {
                monday: [],
                tuesday: [],
                wednesday: [],
                thursday: [],
                friday: []
            };
            refreshGroupLists();
            newGroupNameInput.value = '';
            alert('Группа создана!');
        } else {
            alert('Введите уникальное название группы.');
        }
    });

    addLessonBtn.addEventListener('click', () => {
        const groupName = editGroupSelect.value;
        const day = document.getElementById('edit-day-select').value;
        const newSubject = document.getElementById('new-subject').value.trim();
        const newTime = document.getElementById('new-time').value.trim();
        const newTeacher = document.getElementById('new-teacher').value.trim();
        if (newSubject && newTime && newTeacher) {
            schedule[groupName][day].push({ subject: newSubject, time: newTime, teacher: newTeacher });
            alert('Пара добавлена!');
        } else {
            alert('Введите название предмета, время и преподавателя.');
        }
    });

    removeLessonBtn.addEventListener('click', () => {
        const groupName = editGroupSelect.value;
        const day = document.getElementById('edit-day-select').value;
        if (schedule[groupName][day].length > 0) {
            schedule[groupName][day].pop();
            alert('Последняя пара удалена!');
        } else {
            alert('Нет пар для удаления.');
        }
    });

    studentGroupSelect.addEventListener('change', (event) => {
        showSchedule(event.target.value);
    });

    const showSchedule = (groupName) => {
        const groupSchedule = schedule[groupName];
        scheduleDisplay.innerHTML = '';
        Object.keys(groupSchedule).forEach(day => {
            const dayDiv = document.createElement('div');
            dayDiv.innerHTML = `<h4>${day.charAt(0).toUpperCase() + day.slice(1)}</h4>`;
            if (groupSchedule[day].length > 0) {
                groupSchedule[day].forEach(lesson => {
                    const lessonDiv = document.createElement('div');
                    lessonDiv.textContent = `${lesson.time} - ${lesson.subject} (${lesson.teacher})`;
                    dayDiv.appendChild(lessonDiv);
                });
            } else {
                dayDiv.innerHTML += `<p>Нет пар</p>`;
            }
            scheduleDisplay.appendChild(dayDiv);
        });
    };

    refreshGroupLists();
});