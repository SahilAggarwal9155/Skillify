import React from "react";
import { Modal, Input, Form, Tag, Divider } from "antd";
import { useFormik } from "formik";
import * as Yup from "yup";
import { InfoCircleOutlined } from "@ant-design/icons";

const EditProfileModal = ({
    isOpen,
    onCancel,
    onSubmit,
    initialValues,
    loading = false,
}) => {
    const formik = useFormik({
        initialValues,
        enableReinitialize: true,
        validationSchema: Yup.object({
            name: Yup.string().required("Name is required"),
            email: Yup.string().email("Invalid email").required("Email is required"),
            about: Yup.string().required("About section is required"),
            skills: Yup.array().of(Yup.string()),
            certificates: Yup.array().of(Yup.string()),
            github: Yup.string().url("Invalid URL").nullable(),
            medium: Yup.string().url("Invalid URL").nullable(),
            twitter: Yup.string().url("Invalid URL").nullable(),
        }),
        onSubmit: (values) => {
            onSubmit(values);
        },
    });

    const handleTagClose = (field, index) => {
        const newValues = [...formik.values[field]];
        newValues.splice(index, 1);
        formik.setFieldValue(field, newValues);
    };

    const handleTagAdd = (field, e) => {
        if (e.key === "Enter" || e.key === ",") {
            e.preventDefault();
            const value = e.target.value.trim();
            if (value) {
                formik.setFieldValue(field, [...formik.values[field], value]);
                e.target.value = "";
            }
        }
    };

    return (
        <Modal
            title="Edit Profile"
            open={isOpen}
            onOk={formik.handleSubmit}
            onCancel={onCancel}
            okText="Save Changes"
            cancelText="Cancel"
            width={700}
            okButtonProps={{ loading }}
        >
            <Divider />
            <Form layout="vertical" onSubmit={formik.handleSubmit}>
                <Form.Item label="Name" required>
                    <Input
                        name="name"
                        value={formik.values.name}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        status={formik.touched.name && formik.errors.name ? "error" : ""}
                    />
                    {formik.touched.name && formik.errors.name && (
                        <div className="ant-form-item-explain-error">
                            {formik.errors.name}
                        </div>
                    )}
                </Form.Item>

                <Form.Item label="About" required>
                    <Input.TextArea
                        name="about"
                        rows={4}
                        value={formik.values.about}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        status={formik.touched.about && formik.errors.about ? "error" : ""}
                    />
                    {formik.touched.about && formik.errors.about && (
                        <div className="ant-form-item-explain-error">
                            {formik.errors.about}
                        </div>
                    )}
                </Form.Item>

                <Form.Item label="Skills">
                    <div className="mb-2">
                        {formik.values.skills.map((skill, index) => (
                            <Tag
                                key={index}
                                closable
                                onClose={() => handleTagClose("skills", index)}
                                className="mb-2"
                            >
                                {skill}
                            </Tag>
                        ))}
                    </div>
                    <Input
                        placeholder="Type and press enter to add skills"
                        onKeyDown={(e) => handleTagAdd("skills", e)}
                    />
                    <div className="text-xs text-gray-500 mt-1">
                        <InfoCircleOutlined /> Separate skills with commas or press enter
                    </div>
                </Form.Item>

                <Form.Item label="Certificates">
                    <div className="mb-2">
                        {formik.values.certificates.map((cert, index) => (
                            <Tag
                                key={index}
                                closable
                                onClose={() => handleTagClose("certificates", index)}
                                className="mb-2"
                            >
                                {cert}
                            </Tag>
                        ))}
                    </div>
                    <Input
                        placeholder="Type and press enter to add certificates"
                        onKeyDown={(e) => handleTagAdd("certificates", e)}
                    />
                </Form.Item>

                <Divider orientation="left">Social Links</Divider>

                <Form.Item label="GitHub" help="Example: https://github.com/username">
                    <Input
                        prefix={<i className="fab fa-github" />}
                        name="github"
                        value={formik.values.github}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        status={formik.touched.github && formik.errors.github ? "error" : ""}
                        placeholder="https://github.com/username"
                    />
                    {formik.touched.github && formik.errors.github && (
                        <div className="ant-form-item-explain-error">
                            {formik.errors.github}
                        </div>
                    )}
                </Form.Item>

                <Form.Item label="Medium" help="Example: https://medium.com/@username">
                    <Input
                        prefix={<i className="fab fa-medium" />}
                        name="medium"
                        value={formik.values.medium}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        status={formik.touched.medium && formik.errors.medium ? "error" : ""}
                        placeholder="https://medium.com/@username"
                    />
                    {formik.touched.medium && formik.errors.medium && (
                        <div className="ant-form-item-explain-error">
                            {formik.errors.medium}
                        </div>
                    )}
                </Form.Item>

                <Form.Item label="Twitter" help="Example: https://twitter.com/username">
                    <Input
                        prefix={<i className="fab fa-twitter" />}
                        name="twitter"
                        value={formik.values.twitter}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        status={
                            formik.touched.twitter && formik.errors.twitter ? "error" : ""
                        }
                        placeholder="https://twitter.com/username"
                    />
                    {formik.touched.twitter && formik.errors.twitter && (
                        <div className="ant-form-item-explain-error">
                            {formik.errors.twitter}
                        </div>
                    )}
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default EditProfileModal;