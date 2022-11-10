import { ComponentFixture, fakeAsync, flush, TestBed, tick, waitForAsync } from "@angular/core/testing"
import { ActivatedRoute } from "@angular/router";
import { HeroService } from "../hero.service";
import { HeroDetailComponent } from "./hero-detail.component"
import { Location } from '@angular/common';
import { of } from "rxjs";
import { FormsModule } from "@angular/forms";

describe('HeroDetailComponent', () =>  {
    let fixture: ComponentFixture<HeroDetailComponent>;
    let mockActivatedRoute, mockHeroService, mockLocation;
    beforeEach(() => {
        mockActivatedRoute = {
            snapshot: {
                paramMap: {
                    get: () => { return '3'; }
                }
            }
        }
        mockHeroService = jasmine.createSpyObj(['getHero','updateHero']);
        mockLocation = jasmine.createSpyObj(['back']);

        TestBed.configureTestingModule({
            imports: [FormsModule],
            declarations:[HeroDetailComponent],
            providers: [
                {provide: ActivatedRoute, useValue: mockActivatedRoute},
                {provide: HeroService, useValue: mockHeroService},
                {provide: Location, useValue: mockLocation},
            ]
        });
        fixture = TestBed.createComponent(HeroDetailComponent);

        mockHeroService.getHero.and.returnValue(of({id: 11, name: 'abc', strength: 10}))
    });

    it('should render hero name in a h2 tag', () => {
        fixture.detectChanges();

        expect(fixture.nativeElement.querySelector('h2').textContent).toContain('ABC');

    })


    //basic async testing
    it('should call update hero when save is called', (done) => {
        mockHeroService.updateHero.and.returnValue(of({}));
        fixture.detectChanges();

        fixture.componentInstance.save();

        setTimeout(() => {
            expect(mockHeroService.updateHero).toHaveBeenCalled();
            done();
        },300);
    })

    //fake async function
    it('should call update hero when save is called', fakeAsync (() => {
        mockHeroService.updateHero.and.returnValue(of({}));
        fixture.detectChanges();

        fixture.componentInstance.save();
        tick(250);

        
        expect(mockHeroService.updateHero).toHaveBeenCalled();
    }))

    it('should call update hero when save is called', fakeAsync (() => {
        mockHeroService.updateHero.and.returnValue(of({}));
        fixture.detectChanges();

        fixture.componentInstance.save();
        flush();

        
        expect(mockHeroService.updateHero).toHaveBeenCalled();
    }))

    // it('should call update hero when save is called', waitForAsync (() => {
    //     mockHeroService.updateHero.and.returnValue(of({}));
    //     fixture.detectChanges();

    //     fixture.componentInstance.save();
        
    //     fixture.whenStable().then(()=>{
    //         expect(mockHeroService.updateHero).toHaveBeenCalled();
    //     })
    // }))
})