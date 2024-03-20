function createCircularProgressContainer() {
    // контейнер
    const container = document.createElement('div');
    container.classList.add('container');
  
    // Круговой прогресс
    const circularProgress = document.createElement('div');
    circularProgress.classList.add('circular__progress');
    container.appendChild(circularProgress);
  
    // Блок с инпутами
    const inputs = document.createElement('div');
    inputs.classList.add('values');
  
    // Инпут для значения
    const progressValueInput = document.createElement('input');
    progressValueInput.setAttribute('type', 'number');
    progressValueInput.classList.add('progress__value');
    inputs.appendChild(progressValueInput);
    inputs.appendChild(document.createTextNode('Value'));
  
    // Чекбокс для анимации
    const animatedValueCheckbox = document.createElement('input');
    animatedValueCheckbox.setAttribute('type', 'checkbox');
    animatedValueCheckbox.classList.add('animated__value');
    inputs.appendChild(animatedValueCheckbox);
    inputs.appendChild(document.createTextNode('Animated'));
  
    // Чекбокс для скрытия
    const hiddenCheckbox = document.createElement('input');
    hiddenCheckbox.setAttribute('type', 'checkbox');
    hiddenCheckbox.classList.add('hidden__value');
    inputs.appendChild(hiddenCheckbox);
    inputs.appendChild(document.createTextNode('Hidden'));
  
    container.appendChild(inputs);
  
    return container;
  }

class Progress {
    constructor() {
      this.value = 0;
      this.state = 'normal';
    }

    setValue(percent){
        const targetRotation = percent * 3.6;
        this.updateProgress(targetRotation);
    }
    
    setState(newState) {
        this.state = newState;
        switch (this.state) {
            case 'animated':
                this.animate();
                break;
            case 'hidden':
                this.hide();
                break;
            case 'normal':
                this.normal();
                break;
            default:
                break;
        }
    }
    animate(){
        circularProgress.classList.add('animated') 
    }
    hide(){
        circularProgress.style.display = "none"
    }
    normal(){
        circularProgress.classList.remove('animated');
        circularProgress.style.display = "flex"
    }
    
    
    updateProgress(targetRotation){
        const startRotation = currentRotation;
        const step = (targetRotation - startRotation) / 200; 

        function updateRotation(){
            if ((step > 0 && currentRotation < targetRotation) || (step < 0 && currentRotation > targetRotation)){
                currentRotation += step;
                circularProgress.style.background = `conic-gradient(#005cff ${currentRotation}deg, #eaf0f6 0deg )`;
                requestAnimationFrame(updateRotation);
            }
        }

        updateRotation();
    }
}  



document.body.appendChild(createCircularProgressContainer());

const circularProgress = document.querySelector(".circular__progress"),
    inputValue = document.querySelector(".progress__value");
let animatedValue = document.querySelector(".animated__value"),
    hiddenValue = document.querySelector(".hidden__value"),

    currentRotation = 0;


    const progress = new Progress();

inputValue.addEventListener("change", function(){
    progress.setValue(inputValue.value);
});

animatedValue.addEventListener("change", function(){
    this.checked ? progress.setState('animated') 
    : progress.setState('normal');
}  
)

hiddenValue.addEventListener("change", function(){
    this.checked ? progress.setState('hidden') 
    : progress.setState('normal');
}  
)