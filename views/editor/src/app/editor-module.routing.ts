import { EditorComponent } from './components/editor/editor.component';
import { Routes,RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { SocketService } from './services/socket.service';
import { TextService } from './services/text.service';
import { OperationHelpersService } from './services/operation-helpers.service';
import { HttpInterceptorService } from './gaurds/http-interseptor.service';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AuthGaurd } from './gaurds/canActivate';
import { FormsModule } from '@angular/forms';
import { GaurdService } from './services/gaurd.service';

const secureRoutes: Routes = [
    { path: 'editor',
      component: EditorComponent,
      canActivate:[AuthGaurd],
      children:[
        {path:'/:id'}
      ]
    },
    {
        path:'dashboard/:id',
        component:DashboardComponent,
        canActivate:[AuthGaurd]
    },
   
  ];
  @NgModule({
    imports: [
      RouterModule.forChild(secureRoutes),
      FormsModule,
      HttpClientModule
    ],
    declarations:[
        EditorComponent,
        DashboardComponent,
        
    ],
    providers:[
        SocketService,
        TextService,
        OperationHelpersService,
        HttpInterceptorService,
        {provide:HTTP_INTERCEPTORS,
        useClass:HttpInterceptorService,
        multi: true},
        AuthGaurd,
        GaurdService
    ],
    exports: [
      RouterModule
    ]
  })
  export class EditorRoutingModule {}