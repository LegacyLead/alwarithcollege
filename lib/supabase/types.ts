export type Profile = {
  id: string;
  full_name: string;
  role: 'student' | 'teacher' | 'admin' | 'proprietress';
  staff_title: string | null;
  class_id: string | null;
  classes: { name: string } | null;
};
