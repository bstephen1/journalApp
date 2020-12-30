import { Note } from '../../domain/note.entity';
import { NoteDTO } from '../dto/note.dto';

/**
 * A Note mapper object.
 */
export class NoteMapper {
  static fromDTOtoEntity(entityDTO: NoteDTO): Note {
    if (!entityDTO) {
      return;
    }
    let entity = new Note();
    const fields = Object.getOwnPropertyNames(entityDTO);
    fields.forEach(field => {
      entity[field] = entityDTO[field];
    });
    return entity;
  }

  static fromEntityToDTO(entity: Note): NoteDTO {
    if (!entity) {
      return;
    }
    let entityDTO = new NoteDTO();

    const fields = Object.getOwnPropertyNames(entity);

    fields.forEach(field => {
      entityDTO[field] = entity[field];
    });

    return entityDTO;
  }
}
