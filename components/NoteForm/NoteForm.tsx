import { useMutation, useQueryClient } from "@tanstack/react-query";
import css from "./NoteForm.module.css";
import { Formik, Form, Field, ErrorMessage, type FormikHelpers } from "formik";
import { useId } from "react";
import * as Yup from "yup";
import { NewNoteData, NoteTag } from "@/types/note";
import { createNote } from "@/lib/api";

interface OrderFormValues {
  title: string;
  content: string;
  tag: NoteTag | "";
}

const initialValues: OrderFormValues = {
  title: "",
  content: "",
  tag: "",
};

interface NoteFormProps {
  closeModal: () => void;
}

const NoteFormSchema = Yup.object().shape({
  title: Yup.string()
    .min(3, "Title must be at least 3 characters")
    .max(50, "Title is too long")
    .required("Title is required"),
  content: Yup.string().max(500),
  tag: Yup.string()
    .oneOf(["Todo", "Work", "Personal", "Meeting", "Shopping"])
    .required("Tag is required"),
});

function NoteForm({ closeModal }: NoteFormProps) {
  const id = useId();
  const queryClient = useQueryClient();

  const addNote = useMutation({
    mutationFn: (noteData: NewNoteData) => createNote(noteData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
      closeModal();
    },
  });

  const handleSubmit = (
    values: OrderFormValues,
    actions: FormikHelpers<OrderFormValues>
  ) => {
    if (!values.tag) return;

    const noteData: NewNoteData = {
      title: values.title,
      content: values.content,
      tag: values.tag,
    };

    addNote.mutate(noteData);
    actions.resetForm();
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={NoteFormSchema}
    >
      <Form>
        <div className={css.formGroup}>
          <label htmlFor={`${id}-title`}>Title</label>
          <Field
            id={`${id}-title`}
            type="text"
            name="title"
            className={css.input}
          />
          <ErrorMessage name="title" component="span" className={css.error} />
        </div>

        <div className={css.formGroup}>
          <label htmlFor={`${id}-content`}>Content</label>
          <Field
            as="textarea"
            id={`${id}-content`}
            name="content"
            rows={8}
            className={css.textarea}
          />
          <ErrorMessage name="content" component="span" className={css.error} />
        </div>

        <div className={css.formGroup}>
          <label htmlFor={`${id}-tag`}>Tag</label>
          <Field as="select" id={`${id}-tag`} name="tag" className={css.select}>
            <option value="">---</option>
            <option value="Todo">Todo</option>
            <option value="Work">Work</option>
            <option value="Personal">Personal</option>
            <option value="Meeting">Meeting</option>
            <option value="Shopping">Shopping</option>
          </Field>
          <ErrorMessage name="tag" component="span" className={css.error} />
        </div>

        <div className={css.actions}>
          <button
            onClick={closeModal}
            type="button"
            className={css.cancelButton}
          >
            Cancel
          </button>
          <button type="submit" className={css.submitButton} disabled={false}>
            Create note
          </button>
        </div>
      </Form>
    </Formik>
  );
}

export default NoteForm;
