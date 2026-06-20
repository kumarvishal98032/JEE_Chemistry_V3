let questions = [];
let current = 0;
let answers = [];
function loadQ(){document.getElementById('qno').innerHTML='Question '+(current+1);document.getElementById('question').innerHTML=questions[current].question;let h='';questions[current].options.forEach((o,i)=>{h+=`<div><input type='radio' name='o' ${answers[current]==i?'checked':''} onclick='answers[current]=${i}; palette();'> ${o}</div>`});document.getElementById('options').innerHTML=h;}
function palette(){

    let p='';

    for(let i=0;i<questions.length;i++){

        let color = "#cccccc"; // Not Visited

        if(answers[i] !== null){
            color = "#28a745"; // Green = Answered
        }

        p += `
        <button
            class='palette-btn'
            style='background:${color};color:white;font-weight:bold;'
            onclick='gotoQ(${i})'>
            ${i+1}
        </button>`;
    }

    document.getElementById('palette').innerHTML = p;
}
function gotoQ(i){current=i;loadQ();}
function nextQ(){if(current<questions.length-1){current++;loadQ();}}
function prevQ(){if(current>0){current--;loadQ();}}
function clearResponse(){answers[current] = null;loadQ();palette();}
function submitTest(){

    let score = 0;
    let correct = 0;
    let wrong = 0;
    let unattempted = 0;
    let report = "";
    
for(let i = 0; i < questions.length; i++){

    if(answers[i] === null){

        unattempted++;

        report += `
        <div style="border:1px solid #ddd;padding:15px;margin:10px 0;border-radius:8px;background:#fff8f8;">

            <h3>Question ${i+1}</h3>

            <p><b>${questions[i].question}</b></p>

            <p>A. ${questions[i].options[0]}</p>
            <p>B. ${questions[i].options[1]}</p>
            <p>C. ${questions[i].options[2]}</p>
            <p>D. ${questions[i].options[3]}</p>

            <hr>

            <p style="color:orange;">
            ⚪ Your Answer: Not Attempted
            </p>

            <p style="color:green;">
            ✅ Correct Answer:
            ${questions[i].options[questions[i].answer]}
            </p>

        </div>
        `;
    }

    else if(answers[i] === questions[i].answer){

        correct++;
        score += 4;
    }

    else{

        wrong++;
        score -= 1;

        report += `
        <div style="border:1px solid #ddd;padding:15px;margin:10px 0;border-radius:8px;background:#fff8f8;">

            <h3>Question ${i+1}</h3>

            <p><b>${questions[i].question}</b></p>

            <p>A. ${questions[i].options[0]}</p>
            <p>B. ${questions[i].options[1]}</p>
            <p>C. ${questions[i].options[2]}</p>
            <p>D. ${questions[i].options[3]}</p>

            <hr>

            <p style="color:red;">
            ❌ Your Answer:
            ${questions[i].options[answers[i]]}
            </p>

            <p style="color:green;">
            ✅ Correct Answer:
            ${questions[i].options[questions[i].answer]}
            </p>

        </div>
        `;
    }
}

    let accuracy = 0;

    if((correct + wrong) > 0){
        accuracy = ((correct / (correct + wrong)) * 100).toFixed(2);
    }
    let name =
document.getElementById("studentName").value;

fetch(
"https://script.google.com/macros/s/AKfycbyzVO9YPLSgfQU5Lmv6ux_lXwbz0figyTdXBtSa4QoexKT2a012ik2gYnn__nPK_uTdqA/exec",
{
    method:"POST",
    mode: "no-cors",
    headers:{
        "Content-Type":"application/json"
    },
    body:JSON.stringify({
        name:name,
        score:score,
        correct:correct,
        wrong:wrong,
        unattempted:unattempted
    })
}
)
.then(response => response.text())
.then(data => console.log("Saved:", data))
.catch(error => console.error("Error:", error));
    
    document.body.innerHTML = `
    <div style="font-family:Arial;padding:30px;max-width:800px;margin:auto;">
        <h1>JEE Chemistry Mock Test Result</h1>

        <hr>


    <h2>Student Information</h2>

    <p><b>Name:</b> ${name}</p>

    <hr>
        <h2>Summary</h2>

        <p><b>Total Questions:</b> ${questions.length}</p>

        <p><b>Correct Answers:</b> ${correct}</p>

        <p><b>Wrong Answers:</b> ${wrong}</p>

        <p><b>Unattempted:</b> ${unattempted}</p>

        <p><b>Accuracy:</b> ${accuracy}%</p>

        <hr>

        <h2>Final Score</h2>

        <p>
        (${correct} × 4) − (${wrong} × 1)
        </p>

        <h1>${score} Marks</h1>

        <hr>

       <h2>Performance</h2>

${
    score >= 180 ? "<h3>Outstanding ⭐</h3>" :
    score >= 160 ? "<h3>Excellent ✅</h3>" :
    score >= 140 ? "<h3>Good 👍</h3>" :
    score >= 120 ? "<h3>Average 📘</h3>" :
    "<h3>Needs Improvement 📚</h3>"
}

<hr>

<h2>Detailed Analysis</h2>

<p>
Review all wrong and unattempted questions below.
</p>

${report}

<hr>

<button onclick="window.print()"
style="
padding:12px 20px;
font-size:16px;
background:#0b5ed7;
color:white;
border:none;
border-radius:8px;
cursor:pointer;
margin-top:20px;
">
📄 Download / Print PDF
</button>

</div>
`;
}
let t=2400;setInterval(()=>{let m=Math.floor(t/60),s=t%60;let el=document.getElementById('timer');if(el){el.innerHTML=String(m).padStart(2,'0')+':'+String(s).padStart(2,'0');}t--;if(t<0)submitTest();},1000);
fetch("https://script.google.com/macros/s/AKfycbxZ5Dt35aLPJEdBGxMbwGZlLCL6F9nKaRIRGzkk_2K8HUrgFvAphGiJ7-JMUrpxkeuHBw/exec")
.then(response => response.json())
.then(data => {

    questions = data;

    // Convert A/B/C/D answers into option numbers
    questions.forEach(q => {

        if(q.answer === "A") q.answer = 0;
        else if(q.answer === "B") q.answer = 1;
        else if(q.answer === "C") q.answer = 2;
        else if(q.answer === "D") q.answer = 3;

    });

    answers = new Array(questions.length).fill(null);

    palette();
    loadQ();

})
.catch(error => {

    alert("Failed to load questions from Google Sheet");

    console.error(error);

});
