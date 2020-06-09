import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField,
  PropertyPaneToggle
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import { escape } from '@microsoft/sp-lodash-subset';

import styles from './EventsWebPart.module.scss';
import * as strings from 'EventsWebPartStrings';

export interface IEventsWebPartProps {
  description: string;
  showpastevents: boolean;
}

import './app/app.module';
import LandingTemplate from './LandingTemplate';

export default class EventsWebPart extends BaseClientSideWebPart <IEventsWebPartProps> {

  public render(): void {
    if (!this.renderedOnce) {
      // var ajax = new XMLHttpRequest();
      // ajax.open("GET", "/src/webparts/events/LandingTemplate.html", false);
      // ajax.send();
      // this.domElement.innerHTML = ajax.responseText;

      this.domElement.innerHTML = LandingTemplate.templateHtml;
    }
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('description', {
                  label: strings.DescriptionFieldLabel
                }),
                PropertyPaneTextField('showpastevents', {
                  label: strings.ShowPastEventsFieldLabel
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
