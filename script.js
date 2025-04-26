
const students = [
    { name: "1. Fionna", gender: "g" }, { name: "2. Arya", gender: "b" },
    { name: "3. Aerish", gender: "g" }, { name: "4. Angela", gender: "g" },
    { name: "5. Lio", gender: "b" }, { name: "6. Aviel", gender: "b" },
    { name: "7. Kyara", gender: "g" }, { name: "8. Charles", gender: "b" },
    { name: "9. Gavin", gender: "b" }, { name: "10. Audi", gender: "g" },
    { name: "11. Ano", gender: "b" }, { name: "12. Edzhar", gender: "b" },
    { name: "13. Caleb", gender: "b" }, { name: "14. Fabian", gender: "b" },
    { name: "15. Astro", gender: "b" }, { name: "16. Satya", gender: "b" },
    { name: "17. Grego", gender: "b" }, { name: "18. Hans", gender: "b" },
    { name: "19. Evan", gender: "b" }, { name: "20. Hugo", gender: "b" },
    { name: "21. Imelda", gender: "g" }, { name: "22. Nathan", gender: "b" },
    { name: "23. Joy", gender: "g" }, { name: "24. Kennard", gender: "b" },
    { name: "25. Niko", gender: "b" }, { name: "26. Mario", gender: "b" },
    { name: "27. Michael", gender: "b" }, { name: "28. Ayu", gender: "g" },
    { name: "29. Novandra", gender: "b" }, { name: "30. Rama", gender: "b" },
    { name: "31. Quinn", gender: "b" }, { name: "32. Steven", gender: "b" },
    { name: "33. William", gender: "b" }, { name: "34. Arian", gender: "b" }
];

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function displaySeats(arrangement) {
    const tbody = document.getElementById('seatTable').querySelector('tbody');
    tbody.innerHTML = '';
    for (let i = 0; i < 16; i++) {
        const row = tbody.insertRow();
        const cell1 = row.insertCell(0);
        const cell2 = row.insertCell(1);
        cell1.textContent = arrangement[i * 2] ? arrangement[i * 2].name : '';
        cell2.textContent = arrangement[i * 2 + 1] ? arrangement[i * 2 + 1].name : '';
    }
}

function randomizeAll() {
    let list = [...students];
    const lio = list.find(s => s.name.includes('Lio'));
    const astro = list.find(s => s.name.includes('Astro'));
    list = list.filter(s => s !== lio && s !== astro);
    shuffle(list);
    const insertIndex = Math.floor(Math.random() * (list.length - 1));
    list.splice(insertIndex, 0, lio, astro);
    displaySeats(list);
}

function separateBoysAndGirls() {
    let girls = students.filter(s => s.gender === 'g');
    let boys = students.filter(s => s.gender === 'b');
    const lio = boys.find(s => s.name.includes('Lio'));
    const astro = boys.find(s => s.name.includes('Astro'));
    boys = boys.filter(s => s !== lio && s !== astro);
    shuffle(girls);
    shuffle(boys);
    const combined = [];

    // girls sit at seats 1-4 and 17-20
    for (let i = 0; i < 4; i++) combined[i] = girls[i];
    for (let i = 0; i < 4; i++) combined[16 + i] = girls[4 + i];

    const boySeats = [];
    for (let i = 4; i < 16; i++) boySeats.push(i);
    for (let i = 20; i < 32; i++) boySeats.push(i);

    shuffle(boySeats);
    const seat1 = boySeats.pop();
    const seat2 = seat1 % 2 === 0 ? seat1 + 1 : seat1 - 1;
    combined[seat1] = lio;
    combined[seat2] = astro;

    let boyIndex = 0;
    for (const seat of boySeats) {
        combined[seat] = boys[boyIndex++];
    }

    displaySeats(combined);
}
