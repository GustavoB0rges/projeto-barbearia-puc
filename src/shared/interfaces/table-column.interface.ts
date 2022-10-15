export interface TableColumn<T> {
  label: string;
  property: keyof T | any;
  type: 'text' | 'image' | 'badge' | 'progress' | 'checkbox' | 'button' | 'color' | 'toggle' | 'actions' | 'icon';
  disabled?: boolean;
  visible?: boolean;
  align?: 'start' | 'center' | 'end';
  sort?: boolean;
  cssClasses?: string[];
}
