let departmentDropDown = document.querySelector('#department');
let courseNumberInput = document.querySelector('#courseNumber');
let termsDropDown = document.querySelector('#quarter');
const submitSearch = document.querySelector('#submitSearch');
let displayCourse = document.querySelector('#displayCourse');
let i = 0;

let duplicate = [];

fetch('https://api.peterportal.org/rest/v0/courses/all')
    .then(res => res.json())
    .then(data => {
        for (const classes of data) {
            if (!duplicate.includes(classes.department)) {
                duplicate.push(classes.department);
                const createDepartment = document.createElement('option');
                createDepartment.innerText = classes.department;
                createDepartment.value = classes.department;
                departmentDropDown.append(createDepartment);
            }
        }
    });

submitSearch.addEventListener('click', (e) => {
    e.preventDefault();
    let department = departmentDropDown.value;
    const course = courseNumberInput.value;
    const term = termsDropDown.value;
    displayCourse.innerHTML = '';
    let courseFound = false;
    let courseList = [];

    let rowColor = 0;

    if (department === 'I&C SCI') {
        department = 'I%26C+SCI';
    } else if (department === 'CRM/LAW') {
        department = 'CRM%2FLAW';
    }


    console.log(department)
    if (course === '') {
        fetch(`https://api.peterportal.org/rest/v0/schedule/soc?term=${term}&department=${department}&courseNumber=${course}`)
            .then(response => response.json())
            .then(newData => {
                for (let classes of newData.schools[0].departments[0].courses) {
                    const courseDiv = document.createElement('div');
                    const caption = document.createElement('caption');
                    const span = document.createElement('span');
                    if (department === 'I%26C+SCI') {
                        department = 'I&C SCI';
                    } else if (department === 'CRM%2FLAW') {
                        department = 'CRM/LAW';
                    }

                    span.innerText = `${department} ${classes.courseNumber}`;
                    span.classList.add('bold');
                    caption.innerText = `${classes.courseTitle}`;
                    caption.prepend(span);

                    const tr1 = document.createElement('tr');
                    const code = document.createElement('th');
                    code.innerText = 'Code';
                    const type = document.createElement('th');
                    type.innerText = 'Type';
                    const section = document.createElement('th');
                    section.innerText = 'Section';
                    const unit = document.createElement('th');
                    unit.innerText = 'Unit';
                    const instructor = document.createElement('th');
                    instructor.innerText = 'Instructor';
                    const day = document.createElement('th');
                    day.innerText = 'Days';
                    const time = document.createElement('th');
                    time.innerText = 'Time';
                    const bldg = document.createElement('th');
                    bldg.innerText = 'Building';

                    courseDiv.append(caption);
                    courseDiv.append(tr1);
                    tr1.append(code);
                    tr1.append(type);
                    tr1.append(section);
                    tr1.append(unit);
                    tr1.append(instructor);
                    tr1.append(day);
                    tr1.append(time);
                    tr1.append(bldg);



                    console.log(classes.courseNumber)
                    for (let i = 0; i < classes.sections.length; i++) {
                        let newTr = document.createElement('tr')

                        if (rowColor === 0) {
                            newTr.style.backgroundColor = '#DEE7E7';
                            rowColor = 1;
                        } else if (rowColor === 1) {
                            newTr.style.backgroundColor = '#F4FAFF';
                            rowColor = 0;
                        }

                        courseCode = document.createElement('td');
                        courseCode.innerText = classes.sections[i].sectionCode;
                        newTr.append(courseCode)

                        courseType = document.createElement('td');
                        courseType.innerText = classes.sections[i].sectionType;
                        newTr.append(courseType)

                        courseNum = document.createElement('td');
                        courseNum.innerText = classes.sections[i].sectionNum;
                        newTr.append(courseNum)

                        courseUnits = document.createElement('td');
                        courseUnits.innerText = classes.sections[i].units;
                        newTr.append(courseUnits)

                        courseInstructor = document.createElement('td');
                        courseInstructor.innerText = classes.sections[i].instructors;
                        newTr.append(courseInstructor)

                        courseDays = document.createElement('td');
                        courseDays.innerText = classes.sections[i].meetings[0].days;
                        newTr.append(courseDays)


                        courseTime = document.createElement('td');
                        courseTime.innerText = classes.sections[i].meetings[0].time;
                        newTr.append(courseTime)

                        courseBldg = document.createElement('td');
                        courseBldg.innerText = classes.sections[i].meetings[0].bldg;
                        newTr.append(courseBldg)



                        // console.log(classes.sections[i].sectionCode)
                        courseDiv.append(newTr)
                    }
                    displayCourse.append(courseDiv)
                }
            })
    } else if (course !== '') {
        fetch(`https://api.peterportal.org/rest/v0/schedule/soc?term=${term}&department=${department}&courseNumber=${course}`)
            .then(response => response.json())
            .then(newData => {
                if (newData.schools.length === 0) {
                    alert(`${department} ${course} is unavailable or does not exist. Enter valid course`)
                } else {
                    for (classes of newData.schools[0].departments[0].courses) {
                        const courseDiv = document.createElement('div');
                        const caption = document.createElement('caption');
                        const span = document.createElement('span');
                        if (department === 'I%26C+SCI') {
                            department = 'I&C SCI';
                        } else if (department === 'CRM%2FLAW') {
                            department = 'CRM/LAW';
                        }
                        span.innerText = `${department} ${classes.courseNumber}`;
                        span.classList.add('bold');
                        caption.innerText = `${classes.courseTitle}`;
                        caption.prepend(span);

                        const tr1 = document.createElement('tr');
                        const code = document.createElement('th');
                        code.innerText = 'Code';
                        const type = document.createElement('th');
                        type.innerText = 'Type';
                        const section = document.createElement('th');
                        section.innerText = 'Section';
                        const unit = document.createElement('th');
                        unit.innerText = 'Unit';
                        const instructor = document.createElement('th');
                        instructor.innerText = 'Instructor';
                        const day = document.createElement('th');
                        day.innerText = 'Days';
                        const time = document.createElement('th');
                        time.innerText = 'Time';
                        const bldg = document.createElement('th');
                        bldg.innerText = 'Building';

                        courseDiv.append(caption);
                        courseDiv.append(tr1);
                        tr1.append(code);
                        tr1.append(type);
                        tr1.append(section);
                        tr1.append(unit);
                        tr1.append(instructor);
                        tr1.append(day);
                        tr1.append(time);
                        tr1.append(bldg);

                        for (let i = 0; i < classes.sections.length; i++) {
                            let newTr = document.createElement('tr')


                            if (rowColor === 0) {
                                newTr.style.backgroundColor = '#DEE7E7';
                                rowColor = 1;
                            } else if (rowColor === 1) {
                                newTr.style.backgroundColor = '#F4FAFF';
                                rowColor = 0;
                            }

                            courseCode = document.createElement('td');
                            courseCode.innerText = classes.sections[i].sectionCode;
                            newTr.append(courseCode)

                            courseType = document.createElement('td');
                            courseType.innerText = classes.sections[i].sectionType;
                            newTr.append(courseType)

                            courseNum = document.createElement('td');
                            courseNum.innerText = classes.sections[i].sectionNum;
                            newTr.append(courseNum)

                            courseUnits = document.createElement('td');
                            courseUnits.innerText = classes.sections[i].units;
                            newTr.append(courseUnits)

                            courseInstructor = document.createElement('td');
                            courseInstructor.innerText = classes.sections[i].instructors;
                            let commaCheck = courseInstructor.innerText.splti(',')
                            console.log(commaCheck)    
                            console.log(courseInstructor.innerText)                        
                            newTr.append(courseInstructor)

                            courseDays = document.createElement('td');
                            courseDays.innerText = classes.sections[i].meetings[0].days;
                            newTr.append(courseDays)


                            courseTime = document.createElement('td');
                            courseTime.innerText = classes.sections[i].meetings[0].time;
                            newTr.append(courseTime)

                            courseBldg = document.createElement('td');
                            courseBldg.innerText = classes.sections[i].meetings[0].bldg;
                            newTr.append(courseBldg)


                            // console.log(classes.sections[i].sectionCode)
                            courseDiv.append(newTr)
                        }
                        displayCourse.append(courseDiv)
                    }
                }
            })
    }



})
