import React, { useState } from "react";
import {
    Trans,
    useTranslation
} from "react-i18next";
import { toastr } from "react-redux-toastr";
import classnames from "classnames";

import { X } from "react-feather";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUpload } from "@fortawesome/free-solid-svg-icons";

import avatar1 from "@app/assets/img/avatars/avatar.jpg";

const getDefaultImage = (image) => {
    return image ? {
        default: false,
        url: image
    } : {
        default: true,
        url: avatar1
    }
};

const ImageUpload = ({
    onChange,
    className = "",
    defaultImage,
    disabled
}) => {
    const [id] = useState(`file_${Math.random().toString(16).slice(-4)}`);
    const [image, setImage] = useState(getDefaultImage(defaultImage));
    const { t } = useTranslation();

    const readFile = (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();

            reader.readAsDataURL(file);
            reader.onload = () => resolve({
                file,
                result: reader.result
            });
            reader.onerror = () => reject({
                type: "file-read"
            });
        });
    }

    const readImage = (result) => {
        return new Promise((resolve, reject) => {
            const image = new Image();

            image.src = result;
            image.onload = () => resolve({
                result,
                image
            });
            image.onerror = () => reject({
                type: "file-read"
            });
        });
    }

    const handleChange = (e) => {
        const file = e.target.files[0];

        if (file) {
            if (/^image\/(jpg|jpeg|png)$/.test(file.type)) {
                readFile(file)
                    .then(({ result }) => readImage(result))
                    .then(({ image, result }) => {
                        if (image.width > 200 && image.height > 200) {
                            onChange && onChange({
                                name: file.name,
                                type: file.type,
                                size: Math.round(file.size / 1000) + ' kB',
                                base64: result,
                                file: file
                            });
                            setImage({
                                default: false,
                                url: result
                            });
                        } else {
                            return Promise.reject({
                                type: "file-size"
                            });
                        }
                    })
                    .catch(({ type }) => {
                        const errorType = type || "default";

                        toastr.error(
                            t("toasts.error.title"),
                            t(`toasts.error.${errorType}.message`)
                        );
                    });
            } else {
                toastr.error(
                    t("toasts.error.title"),
                    t("toasts.error.file-type.message")
                );
            }
        }
    }

    const removeImage = () => {
        setImage(getDefaultImage());
        onChange && onChange(null);
    }

    return (
        <div className={`image-upload ${className}`}>
            <div
                className="image-upload__preview"
                title={t("image-upload.alt")}
                style={{
                    backgroundImage: `url(${image.url})`
                }}
            >
                {!image.default && (
                    <span
                        className="image-upload__remove"
                        onClick={removeImage}
                    >
                        <X size={18} />
                    </span>
                )}
            </div>
            <div className="mt-2">
                <label 
                    htmlFor={id} 
                    className={classnames("btn btn-primary", { disabled })}
                >
                    <FontAwesomeIcon icon={faUpload} /> {t("image-upload.button")}
                </label>
                <small className="image-upload__note">
                    <Trans i18nKey="image-upload.note">
                        Минимальный размер изображения 200px на 200px. <br /> Допустимые форматы: .jpeg, .png, .jpg
                    </Trans>
                </small>
                <input
                    id={id}
                    type="file"
                    accept=".jpeg, .png, .jpg"
                    onChange={handleChange}
                    disabled={disabled}
                    hidden
                />
            </div>
        </div>
    );
};

export default ImageUpload;
