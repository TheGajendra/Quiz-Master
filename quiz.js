const questions = {
     basic: [
        { 
            question: "What does HTML stand for?", 
            options: ["Hyper Text Markup Language", "High Tech Machine Learning", "Home Tool Markup Language", "Hyperlink and Text Management Language"], 
            answer: "Hyper Text Markup Language" 
        },
        { 
            question: "Which data structure uses FIFO (First In, First Out) principle?", 
            options: ["Stack", "Queue", "Array", "Tree"], 
            answer: "Queue" 
        },
        { 
            question: "Which programming language is known as the 'mother of all languages'?", 
            options: ["Python", "C", "Java", "Assembly"], 
            answer: "C" 
        },
        { 
            question: "Which company developed Java?", 
            options: ["Microsoft", "Apple", "Sun Microsystems", "Google"], 
            answer: "Sun Microsystems" 
        },
        { 
            question: "What does SQL stand for?", 
            options: ["Structured Query Language", "Simple Query Language", "Sequential Query Language", "Server Query Language"], 
            answer: "Structured Query Language" 
        },
        { 
            question: "Which of the following is a NoSQL database?", 
            options: ["MySQL", "Oracle", "MongoDB", "SQL Server"], 
            answer: "MongoDB" 
        },
        { 
            question: "What is the full form of HTTP?", 
            options: ["Hypertext Transfer Protocol", "Hyperlink Transfer Protocol", "Hypertext Transmission Protocol", "High Tech Transfer Protocol"], 
            answer: "Hypertext Transfer Protocol" 
        },
        { 
            question: "Which symbol is used for comments in C language?", 
            options: ["//", "/* */", "#", "--"], 
            answer: "//" 
        },
        { 
            question: "Which of the following is an example of an operating system?", 
            options: ["MS Excel", "Linux", "Google Chrome", "Python"], 
            answer: "Linux" 
        },
        { 
            question: "What is the main function of the CPU?", 
            options: ["Data storage", "Processing data", "Displaying graphics", "Managing network"], 
            answer: "Processing data" 
        }
        ],
        high: [
            { 
                question: "Which data structure is used for implementing recursion?", 
                options: ["Queue", "Stack", "Linked List", "Array"], 
                answer: "Stack" 
            },
            { 
                question: "Which algorithm is used to find the shortest path in a graph?", 
                options: ["Bubble Sort", "Dijkstra's Algorithm", "Binary Search", "Depth First Search"], 
                answer: "Dijkstra's Algorithm" 
            },
            { 
                question: "What is the time complexity of the quicksort algorithm in the worst case?", 
                options: ["O(n)", "O(n log n)", "O(n^2)", "O(log n)"], 
                answer: "O(n^2)" 
            },
            { 
                question: "Which of the following is NOT a relational database management system?", 
                options: ["MySQL", "PostgreSQL", "MongoDB", "Oracle"], 
                answer: "MongoDB" 
            },
            { 
                question: "Which protocol is used for secure communication over the Internet?", 
                options: ["HTTP", "HTTPS", "FTP", "TCP"], 
                answer: "HTTPS" 
            },
            { 
                question: "Which concept in OOP allows a class to inherit from multiple classes?", 
                options: ["Encapsulation", "Polymorphism", "Multiple Inheritance", "Abstraction"], 
                answer: "Multiple Inheritance" 
            },
            { 
                question: "What does ACID stand for in the context of databases?", 
                options: ["Atomicity, Consistency, Isolation, Durability", "Automatic, Consistent, Indexed, Distributed", "Application, Connection, Integration, Data", "Attribute, Constraint, Index, Data"], 
                answer: "Atomicity, Consistency, Isolation, Durability" 
            },
            { 
                question: "Which of the following is a low-level programming language?", 
                options: ["Python", "C++", "Java", "Assembly"], 
                answer: "Assembly" 
            },
            { 
                question: "Which of the following sorting algorithms is the most efficient for large datasets?", 
                options: ["Bubble Sort", "Selection Sort", "Merge Sort", "Insertion Sort"], 
                answer: "Merge Sort" 
            },
            { 
                question: "What is the primary function of an operating system?", 
                options: ["Compiling code", "Managing hardware resources", "Providing internet access", "Running applications"], 
                answer: "Managing hardware resources" 
            }
        ]
    };

let currentQuestions = [];
let currentQuestionIndex = 0;
let score = 0;
let timer;
let timeLeft = 20;

function selectLevel(level) {
    currentQuestions = questions[level];
    document.getElementById("level-selection").style.display = "none";
    document.getElementById("quiz").style.display = "block";
    loadQuestion();
}

function loadQuestion() {
    clearInterval(timer);
    timeLeft = 20;
    document.getElementById("timer").innerText = `Time Left: ${timeLeft}s`;
    timer = setInterval(updateTimer, 1000);

    const questionElement = document.getElementById("question");
    const optionsContainer = document.getElementById("options");
    const nextButton = document.getElementById("next-btn");
    
    questionElement.innerText = currentQuestions[currentQuestionIndex].question;
    optionsContainer.innerHTML = "";
    nextButton.disabled = true;
    
    currentQuestions[currentQuestionIndex].options.forEach(option => {
        const button = document.createElement("button");
        button.innerText = option;
        button.classList.add("option-btn");
        button.onclick = () => checkAnswer(button, option);
        optionsContainer.appendChild(button);
    });
}

function updateTimer() {
    if (timeLeft > 0) {
        timeLeft--;
        document.getElementById("timer").innerText = `Time Left: ${timeLeft}s`;
    } else {
        clearInterval(timer);
        nextQuestion();
    }
}

function checkAnswer(button, selectedOption) {
    clearInterval(timer);
    const correctAnswer = currentQuestions[currentQuestionIndex].answer;
    const nextButton = document.getElementById("next-btn");
    
    if (selectedOption === correctAnswer) {
        button.style.backgroundColor = "green";
        score++;
    } else {
        button.style.backgroundColor = "red";
    }
    
    document.querySelectorAll(".option-btn").forEach(btn => btn.disabled = true);
    nextButton.disabled = false;
}

function nextQuestion() {
    currentQuestionIndex++;
    if (currentQuestionIndex < currentQuestions.length) {
        loadQuestion();
    } else {
        showScore();
    }
}

function showScore() {
    document.getElementById("quiz").style.display = "none";
    document.getElementById("score-container").style.display = "block";
    document.getElementById("score").innerText = `You scored ${score} out of ${currentQuestions.length}`;
}
function logout() {
sessionStorage.removeItem("loggedIn");
window.location.href = "login.php?logout=true";
}

// Redirect to login if the user is not logged in
if (!sessionStorage.getItem("loggedIn")) {
window.location.href = "login.php";
}