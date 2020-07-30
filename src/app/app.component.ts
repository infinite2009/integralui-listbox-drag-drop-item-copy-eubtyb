import { Component, ViewContainerRef, ViewChild, ViewEncapsulation } from '@angular/core';
import { IntegralUISelectionMode } from '@lidorsystems/integralui-web/bin/integralui/components/integralui.core';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent  {
    @ViewChild('application', {read: ViewContainerRef}) applicationRef: ViewContainerRef;

    public items: Array<any>;
    public cloneItems: Array<any>;
    public selMode: IntegralUISelectionMode = IntegralUISelectionMode.MultiExtended;

    public listStyle: any = {
        general: {
            normal: 'lbox-dd-copy-normal'
        }
    }

    public cloneListStyle: any = {
        general: {
            normal: 'lbox-dd-copy-list'
        }
    }

    public itemStyle: any = {
        general: {
            normal: 'lbox-dd-copy-item-normal'
        }
    }

    public lboxOverviewRatingStyleStars: any = {
        general: { normal: 'lbox-dd-copy-rating' },
        content: { normal: 'lbox-dd-copy-rating-stars-content'}
    }

    constructor(){
        this.items = [
            { id: 1, icon: "sci-fi", text: "Star Trek", year: "2009" },
            { id: 2, icon: "adventure", text: "Cast Away", year: "2000" },
            { id: 3, icon: "action", text: "Gladiator ", year: "2000" },
            { id: 4, icon: "drama", text: "Malèna", year: "2000" },
            { id: 5, icon: "music", text: "Moulin Rouge", year: "2001" },
            { id: 6, icon: "comedy", text: "Snatch", year: "2000"  },
            { id: 7, icon: "biography", text: "A Beautiful Mind", year: "2001"  },
            { id: 8, icon: "crime", text: "Black Hawk Down", year: "2001" },
            { id: 9, icon: "western", text: "Django Unchained", year: "2012"  },
            { id: 10, icon: "sci-fi", text: "Man of Steel", year: "2013" },
            { id: 11, icon: "horror", text: "The Ring", year: "2002" },
            { id: 12, icon: "romance", text: "40 Days and 40 Nights", year: "2002" },
            { id: 13, icon: "sci-fi", text: "Minority Report", year: "2002" },
            { id: 14, icon: "comedy", text: "Scary Movie 3", year: "2003" },
            { id: 15, icon: "music", text: "Walk the Line", year: "2005"  },
            { id: 16, icon: "romance", text: "How to Lose a Guy in 10 Days", year: "2003" },
            { id: 17, icon: "crime", text: "The Dark Knight", year: "2008"  },
            { id: 18, icon: "horror", text: "American Psycho", year: "2000" },
            { id: 19, icon: "drama", text: "The Grand Budapest Hotel", year: "2014" },
            { id: 20, icon: "comedy", text: "The Wolf of Wall Street", year: "2013" }
        ];

        this.cloneItems = [];
    }   

    listDrop(e: any){
        // On COPY, clear the selected items in the left ListBox
        //if (e.action == 'copy' && e.sourceCtrl && e.sourceCtrl.clearSelection)
            //e.sourceCtrl.clearSelection();

        e.cancel = true;

        if (e.sourceCtrl && e.dragItem && Array.isArray(e.dragItem)){
            e.targetCtrl.suspendLayout();

            for (let i = 0; i < e.dragItem.length; i++){
                let clone = e.sourceCtrl.cloneItem(e.dragItem[i]);

                // Depending on drop position, place the clone item accordingly
                switch (e.dropPos){
                    case 1: // Above
                        e.targetCtrl.insertItemBefore(clone, e.targetItem);
                        break;

                    case 2: // Below
                        e.targetCtrl.insertItemAfter(clone, e.targetItem);
                        break;

                    default: // At the end
                        e.targetCtrl.addItem(clone);
                        break;
                }
            }
            
            e.targetCtrl.resumeLayout();
        }
    }
  }
