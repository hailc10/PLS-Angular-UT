import { NO_ERRORS_SCHEMA } from "@angular/core";
import { ComponentFixture, TestBed } from "@angular/core/testing"
import { By } from "@angular/platform-browser";
import { HeroComponent } from "./hero.component"

describe('HeroComponent (shallow tests)', () => {
    let fixture: ComponentFixture<HeroComponent>;


    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [HeroComponent],
            schemas: [NO_ERRORS_SCHEMA]
        });
        fixture = TestBed.createComponent(HeroComponent);
    });

    it('should have the correct hero', () => {
        fixture.componentInstance.hero = {id: 11, name: 'Mr. Nice', strength: 10 };
        fixture.detectChanges();
        expect(fixture.componentInstance.hero.name).toEqual('Mr. Nice');
    })

    it('should render hero name in an anchor tag', () => {
        fixture.componentInstance.hero = {id: 11, name: 'Mr. Nice', strength: 10 };
        fixture.detectChanges();

        let de = fixture.debugElement.query(By.css('a'));
        expect(de.nativeElement.textContent).toContain('Mr. Nice');

        expect(fixture.nativeElement.querySelector('a').textContent).toContain('Mr. Nice');
    })
})