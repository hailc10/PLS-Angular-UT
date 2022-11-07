import { NO_ERRORS_SCHEMA } from "@angular/core";
import { ComponentFixture, TestBed } from "@angular/core/testing"
import { of } from "rxjs";
import { HeroService } from "../hero.service";
import { HeroesComponent } from "./heroes.component"

describe('Heroes Component', () => {
    let fixture: ComponentFixture<HeroesComponent>;
    let mockHeroService;
    let HEROES;

    beforeEach(() => {
        HEROES = [
            { id: 11, name: 'Mr. Nice', strength: 10 },
            { id: 12, name: 'Narco', strength: 5 },
            { id: 13, name: 'Bombasto', strength: 8 },
        ]
        mockHeroService = jasmine.createSpyObj(['getHeroes', 'addHero', 'deleteHero']);
        
        TestBed.configureTestingModule({
            declarations: [HeroesComponent],
            providers: [
                {provide: HeroService, useValue: mockHeroService} 
            ],
            schemas: [NO_ERRORS_SCHEMA]
        })
        fixture = TestBed.createComponent(HeroesComponent);
    })

    it('should do nothing', () => {
        expect(true).toBe(true);
    })

    it('should set heroes correctly from the service', () => {
        mockHeroService.getHeroes.and.returnValue(of(HEROES));
        fixture.detectChanges();

        expect(fixture.componentInstance.heroes.length).toBe(3);
    })
})