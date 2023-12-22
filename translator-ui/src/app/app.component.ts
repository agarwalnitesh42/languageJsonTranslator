import { Component } from '@angular/core';
import { HttpLayerService } from './http-layer.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'comparator';
  inputJson: string="";
  outputJson:  string="";
  loading=false;

  langs = [
    {label:"Albanian ",code:"sq"},
    {label:"Amharic ",code:"am"},
    {label:"Arabic ",code:"ar"},
    {label:"Armenian ",code:"hy"},
    {label:"Azerbaijani ",code:"az"},
    {label:"Basque ",code:"eu"},
    {label:"Belarusian ",code:"be"},
    {label:"Bengali ",code:"bn"},
    {label:"Bosnian ",code:"bs"},
    {label:"Bulgarian ",code:"bg"},
    {label:"Catalan ",code:"ca"},
    {label:"Cebuano ",code:"ceb"},
    {label:"Chinese (Simplified) ",code:"zh-CN"},
    {label:"Chinese (Traditional) ",code:"zh-TW"},
    {label:"Corsican ",code:"co"},
    {label:"Croatian ",code:"hr"},
    {label:"Czech ",code:"cs"},
    {label:"Danish ",code:"da"},
    {label:"Dutch ",code:"nl"},
    {label:"English ",code:"en"},
    {label:"Esperanto ",code:"eo"},
    {label:"Estonian ",code:"et"},
    {label:"Finnish ",code:"fi"},
    {label:"French ",code:"fr"},
    {label:"Frisian ",code:"fy"},
    {label:"Galician ",code:"gl"},
    {label:"Georgian ",code:"ka"},
    {label:"German ",code:"de"},
    {label:"Greek ",code:"el"},
    {label:"Gujarati ",code:"gu"},
    {label:"Haitian Creole",code:"ht"},
    {label:"Hausa ",code:"ha"},
    {label:"Hawaiian ",code:"haw"},
    {label:"Hebrew ",code:"he"},
    {label:"Hindi ",code:"hi"},
    {label:"Hmong ",code:"hmn"},
    {label:"Hungarian ",code:"hu"},
    {label:"Icelandic ",code:"is"},
    {label:"Igbo ",code:"ig"},
    
    {label:"Indonesian ",code:"id"},
    
    {label:"Irish ",code:"ga"},
    {label:"Italian ",code:"it"},
    
    {label:"Japanese ",code:"ja"},
    {label:"Javanese ",code:"jw"},
    {label:"Kannada ",code:"kn"},
    
    {label:"Kazakh ",code:"kk"},
    {label:"Khmer ",code:"km"},
    {label:"Korean ",code:"ko"},
    {label:"Kurdish ",code:"ku"},
    {label:"Kyrgyz ",code:"ky"},
    {label:"Lao ",code:"lo"},
    {label:"Latin ",code:"la"},
    {label:"Latvian ",code:"lv"},
    {label:"Lithuanian ",code:"lt"},
    {label:"Luxembourgish ",code:"lb"},
    {label:"Macedonian ",code:"mk"},
    {label:"Malagasy ",code:"mg"},
    {label:"Malay ",code:"ms"},
    {label:"Malayalam ",code:"ml"},
    {label:"Maltese ",code:"mt"},
    {label:"Maori ",code:"mi"},
    {label:"Marathi ",code:"mr"},
    {label:"Mongolian ",code:"mn"},
    {label:"Myanmar (Burmese) ",code:"my"},
    {label:"Nepali ",code:"ne"},
    {label:"Norwegian ",code:"no"},
    {label:"Nyanja (Chichewa) ",code:"ny"},
    {label:"Pashto ",code:"ps"},
    {label:"Persian ",code:"fa"},
    {label:"Polish ",code:"pl"},
    {label:"Portuguese (Portugal, Brazil) ",code:"pt"},
    {label:"Punjabi ",code:"pa"},
    {label:"Romanian ",code:"ro"},
    {label:"Russian ",code:"ru"},
    {label:"Samoan ",code:"sm"},
    {label:"Scots Gaelic ",code:"gd"},
    {label:"Serbian ",code:"sr"},
    {label:"Sesotho ",code:"st"},
    {label:"Shona ",code:"sn"},
    {label:"Sindhi ",code:"sd"},
    {label:"Sinhala (Sinhalese) ",code:"si"},
    {label:"Slovak ",code:"sk"},
    {label:"Slovenian ",code:"sl"},
    {label:"Somali ",code:"so"},
    {label:"Spanish ",code:"es"},
    {label:"Sundanese ",code:"su"},
    {label:"Swahili ",code:"sw"},
    {label:"Swedish ",code:"sv"},
    {label:"Tagalog (Filipino) ",code:"tl"},
    {label:"Tajik ",code:"tg"},
    {label:"Tamil ",code:"ta"},
    {label:"Telugu ",code:"te"},
    {label:"Thai ",code:"th"},
    {label:"Turkish ",code:"tr"},
    {label:"Ukrainian ",code:"uk"},
    {label:"Urdu ",code:"ur"},
    {label:"Uzbek ",code:"uz"},
    {label:"Vietnamese ",code:"vi"},
    {label:"Welsh ",code:"cy"},
    {label:"Xhosa ",code:"xh"},
    {label:"Yiddish ",code:"yi"},
    {label:"Yoruba ",code:"yo"},
    {label:"Zulu ",code:"zu"}    
  ];
  selectedLang = {code:'',label:''};

  constructor(private _httpService: HttpLayerService) {
    
  }

  prettifyInputJSON(){
    // this.inputJson =  JSON.stringify(this.inputJson, undefined, 4);
  }

  /**
   * Convert input json in required languages 
   */
  convert(){
    if(!this.selectedLang){
      alert('please select the language you want to convert into');
      return false;
    }
    console.log('selected lang is ', this.selectedLang);
    this.loading = true;
    let inputRequest = {
      input_json : JSON.parse(this.inputJson),
      lang: this.selectedLang['code']
    }
    this._httpService.post('http://127.0.0.1:5002/api/convert',inputRequest).subscribe(result => {
      this.outputJson = result['conertedLoad'];
      this.loading = false;
    });
  }

  togglePopUp(){
    var popup = document.getElementById("myPopup");
    popup.classList.toggle("show");
  }
}
