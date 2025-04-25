import React from "react";
import {
    Modal,
    View,
    Text,
    StyleSheet,
    FlatList,
    TouchableOpacity,
} from "react-native";
import AvatarOption from "../common/AvatarOption";

type AvatarModalProps = {
    visible: boolean;
    selectedAvatar: any;
    onSelect: (avatar: any) => void;
    onClose: () => void;
    avatarList: any[];
};

const AvatarModal: React.FC<AvatarModalProps> = ({
    visible,
    selectedAvatar,
    onSelect,
    onClose,
    avatarList,
}) => {
    return (
        <Modal visible={visible} animationType="slide" transparent>
            <View style={styles.overlay}>
                <View style={styles.modalContainer}>
                    <Text style={styles.title}>Pilih Avatar</Text>

                    <FlatList
                        data={avatarList}
                        numColumns={4}
                        keyExtractor={(_, index) => index.toString()}
                        contentContainerStyle={styles.avatarGrid}
                        renderItem={({ item }) => (
                            <AvatarOption
                                image={item}
                                selected={selectedAvatar === item} // Change isSelected to selected
                                onPress={() => onSelect(item)} // Use onPress instead of onSelect
                            />
                        )}
                    />

                    <TouchableOpacity onPress={onClose} style={styles.closeButton}>
                        <Text style={styles.closeText}>Tutup</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: "#00000088",
        justifyContent: "center",
        alignItems: "center",
    },
    modalContainer: {
        backgroundColor: "white",
        borderRadius: 16,
        padding: 16,
        width: "90%",
        maxHeight: "80%",
    },
    title: {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 16,
        textAlign: "center",
    },
    avatarGrid: {
        justifyContent: "center",
        alignItems: "center",
    },
    closeButton: {
        marginTop: 16,
        backgroundColor: "#007AFF",
        padding: 10,
        borderRadius: 8,
        alignSelf: "center",
    },
    closeText: {
        color: "white",
        fontWeight: "bold",
    },
});

export default AvatarModal;
