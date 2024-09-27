package com.v1.server.exceptions.customExceptions;

public class MaxUploadSizeFileException extends RuntimeException {
    
    private final String fileType;

    public MaxUploadSizeFileException(String fileType, long maxSize) {
        super(String.format("El archivo %s excede el tamaño máximo permitido de %d MB", fileType, maxSize));
        this.fileType = fileType;
    }

    public String getFileType() {
        return fileType;
    }
}
