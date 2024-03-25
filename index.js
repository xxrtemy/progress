function createCircularProgressContainer() {
    // контейнер
    const container = document.createElement('div');
    container.classList.add('container');
  
    // Круговой прогресс
    const circularProgress = document.createElement('div');
    circularProgress.classList.add('circular__progress','animated', 'paused');
    container.appendChild(circularProgress);
  
    // Блок с инпутами
    const inputs = document.createElement('div');
    inputs.classList.add('inputs');
  
    // Инпут для значения
    const inputProgress = document.createElement('div');
    inputProgress.classList.add('inputs__progress');
    const progressValueInput = document.createElement('input');
    progressValueInput.setAttribute('type', 'number');
    progressValueInput.classList.add('progress__value');
    inputProgress.appendChild(progressValueInput);
    inputProgress.appendChild(document.createTextNode('Value'))
    inputs.appendChild(inputProgress);
  
    // Чекбокс для анимации
    const inputAnimate = document.createElement('div');
    inputAnimate.classList.add('inputs__animate');
    const animatedValueCheckbox = document.createElement('input');
    animatedValueCheckbox.setAttribute('type', 'checkbox');
    animatedValueCheckbox.classList.add('animated__value');
    inputAnimate.appendChild(animatedValueCheckbox);
    inputAnimate.appendChild(document.createTextNode('Animated'));
    inputs.appendChild(inputAnimate);
  
    // Чекбокс для скрытия
    const inputHidden = document.createElement('div');
    inputHidden.classList.add('inputs__hidden');
    const hiddenCheckbox = document.createElement('input');
    hiddenCheckbox.setAttribute('type', 'checkbox');
    hiddenCheckbox.classList.add('hidden__value');
    inputHidden.appendChild(hiddenCheckbox);
    inputHidden.appendChild(document.createTextNode('Hidden'));
    inputs.appendChild(inputHidden);
  
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
        circularProgress.style.display = "flex"
        circularProgress.classList.remove('paused'); 
    }
    hide(){
        circularProgress.style.display = "none"
    }
    normal(){
        circularProgress.classList.add('paused');
        circularProgress.style.display = "flex"
    }
    
    
    updateProgress(targetRotation){
        const startRotation = currentRotation;
        const step = (targetRotation - startRotation) / 100; 

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
    inputValue = document.querySelector(".progress__value"),
    animatedValue = document.querySelector(".animated__value"),
    hiddenValue = document.querySelector(".hidden__value");

let currentRotation = 0;


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
    : animatedValue.checked ?  progress.setState('animated') 
    : progress.setState('normal');
}  
)