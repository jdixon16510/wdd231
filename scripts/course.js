// Course List Array (provided)
const courses = [
   {
       subject: 'CSE',
       number: 110,
       title: 'Introduction to Programming',
       credits: 2,
       certificate: 'Web and Computer Programming',
       description: 'This course will introduce students to programming. It will introduce the building blocks of programming languages (variables, decisions, calculations, loops, array, and input/output) and use them to solve problems.',
       technology: ['Python'],
       completed: true  // <-- Mark true if completed
   },
   {
       subject: 'WDD',
       number: 130,
       title: 'Web Fundamentals',
       credits: 2,
       certificate: 'Web and Computer Programming',
       description: 'This course introduces students to the World Wide Web and to careers in web site design and development...',
       technology: ['HTML', 'CSS'],
       completed: true
   },
   {
       subject: 'CSE',
       number: 111,
       title: 'Programming with Functions',
       credits: 2,
       certificate: 'Web and Computer Programming',
       description: 'CSE 111 students become more organized, efficient, and powerful computer programmers...',
       technology: ['Python'],
       completed: true
   },
   {
       subject: 'CSE',
       number: 210,
       title: 'Programming with Classes',
       credits: 2,
       certificate: 'Web and Computer Programming',
       description: 'This course will introduce the notion of classes and objects...',
       technology: ['C#'],
       completed: true
   },
   {
       subject: 'WDD',
       number: 131,
       title: 'Dynamic Web Fundamentals',
       credits: 2,
       certificate: 'Web and Computer Programming',
       description: 'This course builds on prior experience in Web Fundamentals and programming...',
       technology: ['HTML', 'CSS', 'JavaScript'],
       completed: true
   },
   {
       subject: 'WDD',
       number: 231,
       title: 'Frontend Web Development I',
       credits: 2,
       certificate: 'Web and Computer Programming',
       description: 'This course builds on prior experience with Dynamic Web Fundamentals...',
       technology: ['HTML', 'CSS', 'JavaScript'],
       completed: false
   }
];

// Function to render courses dynamically
function renderCourses(filteredCourses) {
   const courseCards = document.getElementById('course-cards');
   courseCards.innerHTML = '';
 
   filteredCourses.forEach(course => {
     const card = document.createElement('div');
     card.className = course.completed ? 'course-card completed' : 'course-card';
 
     card.innerHTML = `
       ${course.completed ? '<div class="badge">✔ Completed</div>' : ''}
       <h3>${course.subject} ${course.number} - ${course.title}</h3>
     `;
 
     courseCards.appendChild(card);
   });
 
   const totalCredits = filteredCourses.reduce((sum, course) => sum + course.credits, 0);
   document.getElementById('total-credits').textContent = `Total Credits: ${totalCredits}`;
 }
 
 

// Filtering controls
document.getElementById('all-courses').addEventListener('click', () => {
   renderCourses(courses);
   setActiveButton('all-courses');
});

document.getElementById('wdd-courses').addEventListener('click', () => {
   const wddCourses = courses.filter(course => course.subject === 'WDD');
   renderCourses(wddCourses);
   setActiveButton('wdd-courses');
});

document.getElementById('cse-courses').addEventListener('click', () => {
   const cseCourses = courses.filter(course => course.subject === 'CSE');
   renderCourses(cseCourses);
   setActiveButton('cse-courses');
});

// Initial load
renderCourses(courses);

function setActiveButton(buttonId) {
   const buttons = document.querySelectorAll('#course-controls button');
   buttons.forEach(button => button.classList.remove('active')); // remove active from all
   document.getElementById(buttonId).classList.add('active'); // add active to clicked
 }

 // Initial load
renderCourses(courses);
setActiveButton('all-courses'); // ✅ highlight All button by default

 
