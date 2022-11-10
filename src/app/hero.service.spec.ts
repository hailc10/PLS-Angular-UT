import { HttpClient } from "@angular/common/http";
import { inject, TestBed } from "@angular/core/testing"
import { HeroService } from "./hero.service"
import { MessageService } from "./message.service";
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing"

describe('Hero service', () => {
    let mockMessageService;
    let httpTestingController: HttpTestingController;
    let service: HeroService;

    beforeEach(()=>{
        mockMessageService = jasmine.createSpyObj(['add']);

        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [
                HeroService,
                {
                    provide: MessageService, 
                    useValue: mockMessageService
                }
            ]
        });

        httpTestingController = TestBed.inject(HttpTestingController);
        service = TestBed.inject(HeroService);
    })

    describe('get Hero', () => {
        it('should call get with the correct URL', () => {
            service.getHero(13).subscribe();
            
            
            const req = httpTestingController.expectOne('api/heroes/13')
            req.flush({id: 13, name: 'Bombasto', strength: 8})
            expect(req.request.method).toBe('GET');
            httpTestingController.verify();
        })
    })
})