import type { FC, ReactNode } from "react";
import { View, Modal as NativeModal, Text, StyleSheet } from "react-native";

interface ModalProps {
    visible?: boolean;
    onRequestClose: () => void;
    title: string;
    subtitle: string;
    children: ReactNode;
}

export const Modal: FC<ModalProps> = ({
    children,
    visible,
    onRequestClose,
    title,
    subtitle,
}) => {

    return (
        <NativeModal animationType="fade" transparent={true} visible={visible} statusBarTranslucent={true} onRequestClose={onRequestClose}>
            <View style={[styles.modalWrapper, styles.bg]}>
                <View style={styles.modalView}>
                    <View>
                        <Text style={styles.title}>
                            {title}
                        </Text>
                        <Text style={styles.subtitle}>
                            {subtitle}
                        </Text>
                    </View>
                    <View>{children}</View>
                </View>
            </View>
        </NativeModal>
    );
};


const styles = StyleSheet.create({
    bg: {
        backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
    modalWrapper: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    modalView: {
        width: 270,
        backgroundColor: "white",
        borderRadius: 12,
        shadowColor: "black",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        padding: 20,
        paddingHorizontal: 16,
    },
    title: {
        lineHeight: 20,
        fontSize: 16,
        fontWeight: "bold",
    },
    subtitle: {
        lineHeight: 24,
        marginTop: 12,
        marginBottom: 0,
    },
});
