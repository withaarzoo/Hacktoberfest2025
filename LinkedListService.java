package com.example.linkedlistapi.service;

import org.springframework.stereotype.Service;
import java.util.LinkedList;
import java.util.List;

@Service
public class LinkedListService {
    private final LinkedList<String> list = new LinkedList<>();

    public List<String> getAll() {
        return list;
    }

    public String getByIndex(int index) {
        if (index < 0 || index >= list.size()) {
            throw new IndexOutOfBoundsException("Invalid index");
        }
        return list.get(index);
    }

    public void add(String value) {
        list.add(value);
    }

    public void remove(int index) {
        if (index < 0 || index >= list.size()) {
            throw new IndexOutOfBoundsException("Invalid index");
        }
        list.remove(index);
    }

    public int size() {
        return list.size();
    }
}
