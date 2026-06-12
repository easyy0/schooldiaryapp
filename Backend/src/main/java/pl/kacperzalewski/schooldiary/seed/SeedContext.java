package pl.kacperzalewski.schooldiary.seed;

import pl.kacperzalewski.schooldiary.entity.*;
import pl.kacperzalewski.schooldiary.entity.SchoolClass.SchoolClass;

import java.util.*;

public class SeedContext {
    private final Map<String, User> users = new HashMap<>();
    private final Map<String, Subject> subjects = new HashMap<>();
    private final Map<String, Mark> marks = new HashMap<>();
    private final Map<String, SchoolClass> classes = new HashMap<>();
    private final List<Room> rooms = new ArrayList<>();

    public void putUser(String username, User u) {
        users.put(username, u);
    }

    public User user(String username) {
        return require(users, username, "User");
    }

    public List<User> users() {
        return users.values().stream().toList();
    }

    public void putSubject(String name, Subject l) {
        subjects.put(name, l);
    }

    public Subject subject(String name) {
        return require(subjects, name, "Subject");
    }

    public List<Subject> subjects() {
        return subjects.values().stream().toList();
    }

    public void putMark(String code, Mark m) {
        marks.put(code, m);
    }

    public Mark mark(String code) {
        return require(marks, code, "Mark");
    }

    public void putClass(String name, SchoolClass c) {
        classes.put(name, c);
    }

    public SchoolClass schoolClass(String name) {
        return require(classes, name, "SchoolClass");
    }

    public Map<String, SchoolClass> schoolClasses() {
        return classes;
    }

    public void addRoom(Room r) {
        rooms.add(r);
    }

    public List<Room> rooms() {
        return Collections.unmodifiableList(rooms);
    }

    private static <T> T require(Map<String, T> map, String key, String type) {
        T val = map.get(key);
        if (val == null) throw new IllegalStateException(type + " not found in SeedContext: " + key);
        return val;
    }
}