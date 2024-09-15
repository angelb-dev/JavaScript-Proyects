document.addEventListener('DOMContentLoaded', () => {
    const display = document.calculator.ans;
    const buttons = document.querySelectorAll('input[type="button"]');

    function calculate() {
        try {
            display.value = eval(display.value.replace(/x/g, '*'));
        } catch {
            display.value = 'Error';
        }
    }

    buttons.forEach(button => {
        button.addEventListener('click', () => {
            const value = button.value;
            if (value === '=') {
                calculate();
            } else {
                if (display.value.length < 10) {
                    display.value += value;
                }
            }
        });
    });
});