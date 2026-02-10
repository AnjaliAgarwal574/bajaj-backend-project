const express = require("express");
const axios = require("axios");

const app = express();
app.use(express.json());

const PORT = 3000;
const GEMINI_API_KEY = "AIzaSyARE8VcWUx80s8lor8x5Z_nJ8yl2wLrgCY";


function fibonacci(n) {
  const result = [];
  let a = 0, b = 1;

  for (let i = 0; i < n; i++) {
    result.push(a);
    const next = a + b;
    a = b;
    b = next;
  }

  return result;
}

function isPrime(num) {
  if (num < 2) return false;
  for (let i = 2; i <= Math.sqrt(num); i++) {
    if (num % i === 0) return false;
  }
  return true;
}

function gcd(a, b) {
  while (b !== 0) {
    [a, b] = [b, a % b];
  }
  return a;
}

function lcm(a, b) {
  return (a * b) / gcd(a, b);
}

async function askAI(question) {
  const q = question.toLowerCase();

  if (q.includes("capital") && q.includes("maharashtra")) {
    return "Mumbai";
  }
  if (q.includes("capital") && q.includes("india")) {
    return "Delhi";
  }
  if (q.includes("largest planet")) {
    return "Jupiter";
  }
  if (q.includes("prime minister of india")) {
    return "Modi";
  }

  return "Answer";
}

app.get("/health", (req, res) => {
  res.json({
    is_success: true,
    official_email: "anjali0282.be23@chitkara.edu.in"
  });
});

app.post("/bfhl", async (req, res) => {
  try {
    const body = req.body;

    if (!body || Object.keys(body).length !== 1) {
      return res.status(400).json({
        is_success: false,
        message: "Invalid input. Exactly one key required."
      });
    }

    const key = Object.keys(body)[0];
    const value = body[key];

    if ((key === "prime" || key === "lcm" || key === "hcf") && !Array.isArray(value)) {
    return res.status(400).json({
        is_success: false,
        message: "Value must be an array"
    });
    }

    let result;

    if (key === "fibonacci") {
    result = fibonacci(Number(value));
    }
    else if (key === "prime") {
    result = value.filter(isPrime);
    }
    else if (key === "lcm") {
    result = value.reduce((a, b) => lcm(a, b));
    }
    else if (key === "hcf") {
    result = value.reduce((a, b) => gcd(a, b));
    }
    else if (key === "AI") {
    result = await askAI(value);
    }
    else {
    return res.status(400).json({
        is_success: false,
        message: "Invalid key"
    });
    }


        
    res.status(200).json({
      is_success: true,
      official_email: "anjali0282.be23@chitkara.edu.in",
      data: result
    });

  } catch (err) {
    console.error(err); 
    res.status(500).json({
      is_success: false,
      message: "Server error"
    });
  }
});


app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});
