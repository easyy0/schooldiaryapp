package pl.kacperzalewski.schooldiary.seed.seeds;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import pl.kacperzalewski.schooldiary.entity.Room;
import pl.kacperzalewski.schooldiary.repository.RoomRepository;
import pl.kacperzalewski.schooldiary.seed.DataSeed;
import pl.kacperzalewski.schooldiary.seed.SeedContext;

import java.util.List;
import java.util.stream.IntStream;

@Component
public class RoomsSeed implements DataSeed {
    private final RoomRepository roomRepository;

    @Autowired
    public RoomsSeed(RoomRepository roomRepository) {
        this.roomRepository = roomRepository;
    }

    @Override
    public int order() {
        return 20;
    }

    @Override
    public boolean shouldRun() {
        return roomRepository.count() == 0;
    }

    @Override
    public void seed(SeedContext ctx) {
        List<Room> saved = roomRepository.saveAll(
                IntStream.range(0, 15)
                        .mapToObj(i -> Room.builder().build())
                        .toList()
        );

        saved.forEach(ctx::addRoom);
    }
}