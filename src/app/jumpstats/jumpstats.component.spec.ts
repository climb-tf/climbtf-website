import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JumpstatsComponent } from './jumpstats.component';

describe('JumpstatsComponent', () => {
  let component: JumpstatsComponent;
  let fixture: ComponentFixture<JumpstatsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JumpstatsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JumpstatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
