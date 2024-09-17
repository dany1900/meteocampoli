import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import emailjs, {EmailJSResponseStatus} from 'emailjs-com';
import {SEOService} from '../../service/seoservice.service';
import {Router} from '@angular/router';
import {UtiliyService} from '../../service/utiliy.service';

@Component({
  selector: 'contatti',
  templateUrl: './contatti.component.html',
  styleUrls: ['./contatti.component.css']
})
export class ContattiComponent implements OnInit {

  title: string;
  description: string;
  keywords: string;
  ogUrl: string;
  ogImage: string;

  contactForm: FormGroup;
  imageLoader = true;
  isVisible = true;
  messageAfterSend: string;

  constructor(private fb: FormBuilder, private seo: SEOService, protected router: Router, public utilityService: UtiliyService) {
    this.title = 'Contattaci - Meteo Campoli';
    this.description = 'Riempi il form per metterti in contatto con noi.';
    this.keywords = 'contatti, contatti meteo campoli, meteo campoli contatti, email meteo campoli, contattaci, contattaci meteocampoli';
    this.ogUrl = 'www.meteocampoli.altervista.org/info/contatti';
    this.ogImage = '';
    this.seo.updateMetaInfo(this.title, this.description, this.keywords, this.ogUrl, this.ogImage);
    this.seo.cleanCanonicalUrl();
    this.seo.setCanonicalURL();
    this.contactForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      message: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.utilityService.scrollToSpecifyPosition();
    this.imageLoader = false;
  }

  onSubmit() {
    this.messageAfterSend = null;
    if (this.contactForm.valid) {
      this.imageLoader = true;
      const formData = this.contactForm.value;
      const templateParams = {
        name: formData.name,
        email: formData.email,
        message: formData.message
      };

      emailjs.send('service_3ws1emw', 'template_vltb04e', templateParams, '2wLsntQDWN_omaesO')
        .then((response: EmailJSResponseStatus) => {
          this.imageLoader = false;
          this.messageAfterSend = 'Grazie per averci contattato, forniremo una risposta quanto prima. ';
          this.utilityService.scrollToDown();
        }, (error) => {
          this.messageAfterSend = 'Errore nell\'invio, la preghiamo di riprovare';
          // console.error('FAILED...', error);
          this.imageLoader = false;
          this.utilityService.scrollToDown();
        });
    }
  }
}
