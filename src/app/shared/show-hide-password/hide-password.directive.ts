import { Directive, ElementRef, OnInit } from '@angular/core';

@Directive({
  selector: '[appHidePassword]'
})
export class HidePasswordDirective implements OnInit {

  constructor(private elRef: ElementRef) { }

  ngOnInit() {

    const currentElement = this.elRef.nativeElement;
    const parentElement = currentElement.parentNode;

    const matIcon = document.createElement('span');
    matIcon.setAttribute('class', 'fa fa-eye cursor-pointer');
    parentElement.setAttribute('style', 'display: flex')

    matIcon.addEventListener('click', function () {
      const type = currentElement.getAttribute('type');
      if (type === 'password') {
        currentElement.setAttribute('type', 'text');
        matIcon.setAttribute('class', 'fa fa fa-eye-slash cursor-pointer');
      } else {
        currentElement.setAttribute('type', 'password');
        matIcon.setAttribute('class', 'fa fa-eye cursor-pointer');
      }
    });

    parentElement.appendChild(matIcon);
  }

}
