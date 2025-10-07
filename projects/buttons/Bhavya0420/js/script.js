function clearScreen() {
    document.getElementById("result").value = "";
  }
  
  function del() {
    const input = document.getElementById("result").value;
    document.getElementById("result").value = input.slice(0, -1);
  }
  
  function display(value) {
    document.getElementById("result").value += value;
  }
  
  function giveAns() {
    try {
      const result = eval(document.getElementById("result").value);
      document.getElementById("result").value = result;
    } catch (error) {
      document.getElementById("result").value = "Error";
    }
  }
  