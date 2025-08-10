// import React, { useEffect } from "react";
// import { useForm } from "react-hook-form";
// import { yupResolver } from "@hookform/resolvers/yup";
// import * as Yup from "yup";

// import Input from "../../../../components/Input";
// import Button from "../../../../components/Button";
// import Textarea from "../../../../components/Textarea";
// import Select from "../../../../components/Select";

// import styles from "./AddMenu.module.css"; // CSS module import

// interface Props {
//   onClose: () => void;
//   onAdd: (menu: Omit<Menu, "id">) => void;
//   editMenu?: Menu | null;
// }

// interface MenuFormInputs {
//   menuName: string;
//   menuSubHeading?: string;
//   menuPosition: string;
//   menuDescription?: string;
//   seoUrl: string;
//   otherUrl?: string;
//   website: string;
//   displayArea: string;
//   displayOnMenu: string;
//   target: string;
// }

// const schema = Yup.object({
//   website: Yup.string().required("Website is required"),
//   displayArea: Yup.string().required("Display area is required"),
//   displayOnMenu: Yup.string().required("Display on menu is required"),
//   menuName: Yup.string().required("Menu name is required"),
//   menuSubHeading: Yup.string().nullable(),
//   menuPosition: Yup.string()
//     .matches(/^[1-9]\d*$/, "Menu position must be a positive number")
//     .required("Menu position is required"),
//   menuDescription: Yup.string().nullable(),
//   seoUrl: Yup.string()
//     .matches(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Invalid SEO URL format")
//     .required("SEO URL is required"),
//   otherUrl: Yup.string().nullable(),
//   target: Yup.string().required("Target is required"),
// });

// const AddMenuModal: React.FC<Props> = ({ onClose, onAdd, editMenu }) => {
//   const {
//     register,
//     handleSubmit,
//     formState: { errors, isSubmitting },
//     reset,
//   } = useForm<MenuFormInputs>({
//     resolver: yupResolver(schema),
//     defaultValues: {
//       website: "English",
//       displayArea: "Main Navigation",
//       displayOnMenu: "Yes",
//       target: "Same Window",
//     },
//   });

//   useEffect(() => {
//     if (editMenu) {
//       reset({
//         menuName: editMenu.name,
//         menuPosition: String(editMenu.position),
//         menuDescription: editMenu.description || "",
//         seoUrl: editMenu.path || "",
//         otherUrl: "",
//         website: "English",
//         displayArea: "Main Navigation",
//         displayOnMenu: "Yes",
//         target: "Same Window",
//       });
//     }
//   }, [editMenu, reset]);

//   const onSubmit = (data: MenuFormInputs) => {
//     onAdd({
//       name: data.menuName,
//       path: data.seoUrl || data.otherUrl || "",
//       description: data.menuDescription || "",
//       position: parseInt(data.menuPosition, 10),
//     });
//     onClose();
//   };

//   return (
//     <div className={styles.modalBackdrop}>
//       <div className={styles.modalContent}>
//         <h2 className={styles.modalTitle}>
//           {editMenu ? "Edit Menu" : "Add New Menu"}
//         </h2>

//         <form onSubmit={handleSubmit(onSubmit)} className={styles.modalForm}>
//           <div className={styles.modalFormGrid}>
//             <div className={styles.modalSectionHeader}>
//               <h3>General Information</h3>
//             </div>

//             <Select
//               label="Select Website"
//               name="website"
//               options={[{ label: "English", value: "English" }]}
//               register={register}
//               errors={errors}
//             />

//             <Select
//               label="Display Area/Region"
//               name="displayArea"
//               options={[
//                 { label: "Main Navigation", value: "Main Navigation" },
//                 { label: "Bottom Menu", value: "Bottom Menu" },
//               ]}
//               register={register}
//               errors={errors}
//             />

//             <Select
//               label="Display on Menu"
//               name="displayOnMenu"
//               options={[
//                 { label: "Yes", value: "Yes" },
//                 { label: "No", value: "No" },
//               ]}
//               register={register}
//               errors={errors}
//             />

//             <Input
//               label="Enter Menu Name"
//               name="menuName"
//               register={register}
//               errors={errors}
//               required
//             />

//             <Input
//               label="Enter Menu Sub Heading"
//               name="menuSubHeading"
//               register={register}
//               errors={errors}
//             />

//             <Input
//               label="Enter Menu Position"
//               name="menuPosition"
//               register={register}
//               errors={errors}
//               required
//               placeholder="Enter numeric position"
//             />

//             <div className={styles.colSpanFull}>
//               <Textarea
//                 label="Description"
//                 name="menuDescription"
//                 register={register}
//                 errors={errors}
//               />
//             </div>
//           </div>

//           <div className={styles.modalFormGrid}>
//             <div className={styles.modalSectionHeader}>
//               <h3>Hyperlink Information</h3>
//             </div>

//             <Input
//               label="Enter SEO URL"
//               name="seoUrl"
//               register={register}
//               errors={errors}
//               required
//               placeholder="SEO-friendly URL (e.g., my-page)"
//             />

//             <Input
//               label="Enter Other URL"
//               name="otherUrl"
//               register={register}
//               errors={errors}
//               placeholder="Other URL (if any)"
//             />

//             <Select
//               label="Select Target"
//               name="target"
//               options={[
//                 { label: "Same Window", value: "Same Window" },
//                 { label: "New Window", value: "New Window" },
//               ]}
//               register={register}
//               errors={errors}
//             />
//           </div>

//           <div className={styles.modalActions}>
//             <Button
//               title="Cancel"
//               type="button"
//               onClick={onClose}
//               buttonType="secondary"
//             />
//             <Button
//               title={editMenu ? "Update Menu" : "Add Menu"}
//               type="submit"
//               isLoading={isSubmitting}
//               buttonType="primary"
//             />
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default AddMenuModal;

// src/pages/Admin/AddMenu/AddMenuModal.tsx
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
// import { yupResolver } from "@hookform/resolvers";
// import { yupResolver } from "@hookform/resolvers/yup";
import { yupResolver } from "@hookform/resolvers/yup";

// import { yupResolver } from "@hookform/resolvers";

import * as Yup from "yup";

import Input from "../../../../components/Input";
import Button from "../../../../components/Button";
import Textarea from "../../../../components/Textarea";
import Select from "../../../../components/Select";

import styles from "./AddMenu.module.css";

interface Menu {
  id?: number;
  name: string;
  path?: string;
  description?: string;
  position?: number;
  [k: string]: any;
}

interface Props {
  onClose: () => void;
  onAdd: (menu: Partial<Menu>) => Promise<any>; // async
  editMenu?: Menu | null;
}

interface MenuFormInputs {
  menuName: string;
  menuSubHeading?: string;
  menuPosition: string;
  menuDescription?: string;
  seoUrl: string;
  otherUrl?: string;
  website: string;
  displayArea: string;
  displayOnMenu: string;
  target: string;
}

const defaultValues = {
  website: "English",
  displayArea: "Main Navigation",
  displayOnMenu: "Yes",
  target: "Same Window",
  menuName: "",
  menuPosition: "1",
  menuDescription: "",
  seoUrl: "",
  otherUrl: "",
};

const schema = Yup.object({
  website: Yup.string().required("Website is required"),
  displayArea: Yup.string().required("Display area is required"),
  displayOnMenu: Yup.string().required("Display on menu is required"),
  menuName: Yup.string().required("Menu name is required"),
  menuSubHeading: Yup.string().nullable(),
  menuPosition: Yup.string()
    .matches(/^[1-9]\d*$/, "Menu position must be a positive number")
    .required("Menu position is required"),
  menuDescription: Yup.string().nullable(),
  seoUrl: Yup.string()
    .matches(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Invalid SEO URL format")
    .required("SEO URL is required"),
  otherUrl: Yup.string().nullable(),
  target: Yup.string().required("Target is required"),
});

const AddMenuModal: React.FC<Props> = ({ onClose, onAdd, editMenu }) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<MenuFormInputs>({
    resolver: yupResolver(schema),
    defaultValues: defaultValues,
  });

  useEffect(() => {
    if (editMenu) {
      reset({
        menuName: editMenu.name || "",
        menuPosition: String(editMenu.position ?? 1),
        menuDescription: editMenu.description || "",
        seoUrl: editMenu.path || "",
        otherUrl: defaultValues.otherUrl,
        website: defaultValues.website,
        displayArea: defaultValues.displayArea,
        displayOnMenu: defaultValues.displayOnMenu,
        target: defaultValues.target,
      });
    } else {
      reset({});
    }
  }, [editMenu, reset]);

  const onSubmit = async (data: MenuFormInputs) => {
    const payload: Partial<Menu> = {
      name: data.menuName,
      path: data.seoUrl || data.otherUrl || "",
      description: data.menuDescription || "",
      position: parseInt(data.menuPosition, 10),
    };

    try {
      await onAdd(payload);
      onClose();
    } catch (err) {
      // let caller handle details; show a console error for debugging
      console.error("Failed to save menu:", err);
      // optionally show toast here if you want visual feedback
    }
  };

  return (
    <div className={styles.modalBackdrop}>
      <div className={styles.modalContent}>
        <h2 className={styles.modalTitle}>
          {editMenu ? "Edit Menu" : "Add New Menu"}
        </h2>

        <form
          onSubmit={() => {
            handleSubmit(() => onSubmit);
          }}
          className={styles.modalForm}
        >
          <div className={styles.modalFormGrid}>
            <div className={styles.modalSectionHeader}>
              <h3>General Information</h3>
            </div>

            <Select
              label="Select Website"
              name="website"
              options={[{ label: "English", value: "English" }]}
              register={register}
              errors={errors}
            />

            <Select
              label="Display Area/Region"
              name="displayArea"
              options={[
                { label: "Main Navigation", value: "Main Navigation" },
                { label: "Bottom Menu", value: "Bottom Menu" },
              ]}
              register={register}
              errors={errors}
            />

            <Select
              label="Display on Menu"
              name="displayOnMenu"
              options={[
                { label: "Yes", value: "Yes" },
                { label: "No", value: "No" },
              ]}
              register={register}
              errors={errors}
            />

            <Input
              label="Enter Menu Name"
              name="menuName"
              register={register}
              errors={errors}
              required
            />

            <Input
              label="Enter Menu Sub Heading"
              name="menuSubHeading"
              register={register}
              errors={errors}
            />

            <Input
              label="Enter Menu Position"
              name="menuPosition"
              register={register}
              errors={errors}
              required
              placeholder="Enter numeric position"
            />

            <div className={styles.colSpanFull}>
              <Textarea
                label="Description"
                name="menuDescription"
                register={register}
                errors={errors}
              />
            </div>
          </div>

          <div className={styles.modalFormGrid}>
            <div className={styles.modalSectionHeader}>
              <h3>Hyperlink Information</h3>
            </div>

            <Input
              label="Enter SEO URL"
              name="seoUrl"
              register={register}
              errors={errors}
              required
              placeholder="SEO-friendly URL (e.g., my-page)"
            />

            <Input
              label="Enter Other URL"
              name="otherUrl"
              register={register}
              errors={errors}
              placeholder="Other URL (if any)"
            />

            <Select
              label="Select Target"
              name="target"
              options={[
                { label: "Same Window", value: "Same Window" },
                { label: "New Window", value: "New Window" },
              ]}
              register={register}
              errors={errors}
            />
          </div>

          <div className={styles.modalActions}>
            <Button
              title="Cancel"
              type="button"
              onClick={onClose}
              buttonType="secondary"
            />
            <Button
              title={editMenu ? "Update Menu" : "Add Menu"}
              type="submit"
              isLoading={isSubmitting}
              buttonType="primary"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddMenuModal;
