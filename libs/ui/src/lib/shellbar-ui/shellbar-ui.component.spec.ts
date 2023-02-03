import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShellbarUIComponentComponent } from './shellbar-ui.component';

describe('ShellbarUIComponentComponent', () => {
  let component: ShellbarUIComponentComponent;
  let fixture: ComponentFixture<ShellbarUIComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ShellbarUIComponentComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ShellbarUIComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
